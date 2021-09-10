def has_enough_inventory(product_query_set, quantity_wanted):
   print(quantity_wanted)
   inventory_count = product_query_set.inventory
   new_inventory_number = inventory_count - quantity_wanted
   return False if new_inventory_number < 0 else True, new_inventory_number
