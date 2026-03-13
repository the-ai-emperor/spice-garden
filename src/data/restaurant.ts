import type { FC } from "react";
import type { IconProps } from "@tabler/icons-react";
import {
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandFacebook,
} from "@tabler/icons-react";

export interface SocialLink {
  name: string;
  icon: FC<IconProps>;
  link: string;
}

export const restaurant = {
  /* ── Brand ── */
  name: "Spice Garden",
  tagline: "Authentic Indian Flavors, Delivered Fresh",
  description:
    "Spice Garden has been serving authentic Indian cuisine since 2010. We use the finest spices, freshest ingredients, and traditional recipes passed down through generations to deliver an unforgettable dining experience — right to your doorstep.",
  logoUrl: "", // Place your logo URL here, e.g. "/logo.png" or a CDN link

  /* ── Contact ── */
  phone: "+917734865267",
  whatsappPhone: "917734865267", // country code + number, no +
  email: "theaiemperor@gmail.com",

  /* ── Location ── */
  address: "Sitapura, Jaipur, Rajasthan 302022",
  googleMapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56998.63439613878!2d75.81421975462261!3d26.763049432332704!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9024463f983%3A0x67bb37a6035c6ed!2sSitapura%2C%20Jaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1773382841522!5m2!1sen!2sin",

  /* ── Hours ── */
  openingHours: {
    weekdays: "11:00 AM – 11:00 PM",
    weekends: "10:00 AM – 11:30 PM",
  },

  /* ── Socials — add/remove/reorder freely ── */
  socials: [
    {
      name: "WhatsApp",
      icon: IconBrandWhatsapp,
      link: "https://wa.me/919876543210",
    },
    {
      name: "Instagram",
      icon: IconBrandInstagram,
      link: "https://instagram.com/spicegarden",
    },
    {
      name: "Facebook",
      icon: IconBrandFacebook,
      link: "https://facebook.com/spicegarden",
    },
  ] satisfies SocialLink[],

  /* ── Commerce ── */
  currency: "₹",
  minOrderValue: 199,
  deliveryCharge: 49,
  freeDeliveryAbove: 499,
};
