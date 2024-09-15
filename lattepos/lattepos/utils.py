import frappe


@frappe.whitelist()
def get_category_list() -> list:
    return frappe.get_all("Category", fields=["category_name", "category_description"])
