export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    id: "home-delivery",
    title: "Home Delivery",
    description:
      "Fresh, hot food delivered to your doorstep within 45 minutes. Available across all serviceable areas.",
    icon: "🛵",
  },
  {
    id: "catering",
    title: "Catering",
    description:
      "We cater to events, parties, and corporate gatherings. Customised menus crafted for your occasion.",
    icon: "🍽️",
  },
  {
    id: "bulk-orders",
    title: "Bulk Orders",
    description:
      "Special pricing for bulk orders over ₹2000. Perfect for office lunches and large family gatherings.",
    icon: "📦",
  },
  {
    id: "takeaway",
    title: "Takeaway",
    description:
      "Order ahead and pick up your meal fresh from our kitchen. Skip the wait, enjoy instantly.",
    icon: "🥡",
  },
  {
    id: "customisation",
    title: "Custom Orders",
    description:
      "Dietary restrictions? Spice adjustments? We accommodate your preferences for every dish.",
    icon: "✨",
  },
  {
    id: "loyalty",
    title: "Loyalty Rewards",
    description:
      "Regular customers earn special discounts, priority delivery, and exclusive seasonal menus.",
    icon: "🎁",
  },
];
