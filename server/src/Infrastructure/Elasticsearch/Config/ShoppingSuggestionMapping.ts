export const ShoppingSuggestionMapping = {
  mapping: {
    dynamic: false,
    properties: {
      title: {
        type: 'keyword',
      },
      categoryId: {
        type: 'keyword',
      },
      categoryName: {
        type: 'keyword',
      },
    },
  },
};
