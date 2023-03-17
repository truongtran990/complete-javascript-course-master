# def set_default_input_data_by_type(self, data):
#     ...
#     for doc_field_key, doc_field_value in doc_fields_dict.items():
#         if doc_field_key not in deal_sub_set_dict.keys():
#             if doc_field_key in FieldType.NUMBER_FIELD_TYPES:
#                 copy_data["input_data"][doc_field_value] = 0
#             elif doc_field_key in FieldType.OTHER_FIELD_TYPES:
#                 copy_data["input_data"][doc_field_value] = ""