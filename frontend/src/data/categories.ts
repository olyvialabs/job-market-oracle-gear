type Category = {
  id: string;
  title: string;
};

type Subcategory = {
  id: string;
  title: string;
};

// Define a type for the subcategories object with an index signature
type Subcategories = {
  [key: string]: Subcategory[];
};
export const categories: Category[] = [
  { id: "0", title: "🖥️ Software & Computing" },
  { id: "1", title: "🎨 Marketing" },
];
export const subcategories: Subcategories = {
  "0": [
    { id: "0", title: "🌍 Web Dev" },
    {
      id: "1",
      title: "🖥️ Algorithms",
    },
  ],
  "1": [
    { id: "0", title: "🦹‍♂️ Digital Content" },
    {
      id: "1",
      title: "🖼️ Logo creation",
    },
  ],
};
