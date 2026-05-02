from django.shortcuts import render
from django.http import JsonResponse
from django.db import transaction
from django.db.models import Sum
import json
from django.utils import timezone
from datetime import timedelta
from django.views.decorators.csrf import csrf_exempt 
from.models import Product, Order, OrderItem

def home(request):
    return JsonResponse({"message": "POS Backend Running 🚀"})

@csrf_exempt
def purchase(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            product_id = data.get('product_id')

            with transaction.atomic():
                product = Product.objects.select_for_update().get(id=product_id)

                if product.stock <= 0:
                    return JsonResponse({'error': 'Product out of stock'}, status=400)
                
                product.stock -= 1
                product.save()

            return JsonResponse({'message': 'Sale processed successfully'})
        except Product.DoesNotExist:
            return JsonResponse({'error': 'Product not found'}, status=404)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)


def analytics(request):
    last_30_days = timezone.now() - timedelta(days=30)

    daily_revenue = (
        Order.objects
        .filter(date__gte=last_30_days)
        .values('date')
        .annotate(total=Sum('total_price'))
        .order_by('date')
    )

    top_products = (
        OrderItem.objects
        .filter(order__date__gte=last_30_days)
        .values('product__name')
        .annotate(total_sales=Sum('quantity'))
        .order_by('-total_sales')[:5] 
    )

    return JsonResponse({
        "daily_revenue": list(daily_revenue),
        "top_products": list(top_products)
    })


@csrf_exempt
def checkout(request):
    if request.method == "POST":
        data = json.loads(request.body)

        items = data["items"]
        total = data["total"]

        try:
            with transaction.atomic():

                order = Order.objects.create(
                    total_price=total
                )

                receipt_items = []

                for item in items:
                    product = Product.objects.select_for_update().get(id=item["id"])
                    qty = item["qty"]

                    if product.stock < qty:
                        raise Exception(f"{product.name} out of stock")

                    product.stock -= qty
                    product.save()

                    OrderItem.objects.create(
                        order=order,
                        product=product,
                        quantity=qty,
                        price=product.price * qty
                    )

                    receipt_items.append({
                        "name": product.name,
                        "qty": qty,
                        "price": float(product.price * qty)
                    })

            return JsonResponse({
                "message": "success",
                "order_id": order.id,
                "receipt": receipt_items,
                "total": total
            })

        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


def products(request):
    data = list(Product.objects.values())
    return JsonResponse(data, safe=False)
