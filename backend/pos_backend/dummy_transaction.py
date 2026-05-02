import random
from datetime import datetime, timedelta
from django.utils import timezone

from pos_backend.models import Product, Order, OrderItem

products = []

for i in range(25):
    product = Product.objects.create(
        name=f"Product {i+1}",
        price=round(random.uniform(5.0, 100.0), 2),
        stock=random.randint(10, 100)
    )
    products.append(product)

print("Dummy products created.")



for i in range(100000):
    order = Order.objects.create(
        total_price=0,
        date=timezone.now() - timedelta(days=random.randint(0, 180))
    )

    total = 0

    for j in range(random.randint(1, 4)):
        product = random.choice(products)
        quantity = random.randint(1, 5)
        sub = product.price * quantity
        total += sub

        OrderItem.objects.create(
            order=order,
            product=product,
            quantity=quantity,
            price=sub
        )

    order.total_price = total
    order.save()

    if (i + 1) % 1000 == 0:
        print(f"{i + 1} dummy orders created.")


print("100k dummy orders created.")



