import frappe


@frappe.whitelist()
def get_all_products() -> list:
    return frappe.db.get_all('Product', fields=[
        'iamge', 'product_name', 'category', 'price'
    ])