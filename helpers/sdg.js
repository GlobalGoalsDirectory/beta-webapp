import { defineMessage } from "@lingui/macro";

const SDGS = [
  {
    number: 1,
    label: defineMessage({ message: "No poverty" }),
    description: defineMessage({
      message: "End poverty in all its forms everywhere.",
    }),
  },
  {
    number: 2,
    label: defineMessage({
      message: "Zero hunger",
    }),
    description: defineMessage({
      message:
        "End hunger, achieve food security and improved nutrition and promote sustainable agriculture.",
    }),
  },
  {
    number: 3,
    label: defineMessage({ message: "Good health and well-being" }),
    description: defineMessage({
      message:
        "Ensure healthy lives and promote well-being for all at all ages.",
    }),
  },
  {
    number: 4,
    label: defineMessage({ message: "Quality education" }),
    description: defineMessage({
      message:
        "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    }),
  },
  {
    number: 5,
    label: defineMessage({ message: "Gender equality" }),
    description: defineMessage({
      message: "Achieve gender equality and empower all women and girls.",
    }),
  },
  {
    number: 6,
    label: defineMessage({ message: "Clean water and sanitation" }),
    description: defineMessage({
      message:
        "Ensure availability and sustainable management of water and sanitation for all.",
    }),
  },
  {
    number: 7,
    label: defineMessage({ message: "Affordable and clean energy" }),
    description: defineMessage({
      message:
        "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    }),
  },
  {
    number: 8,
    label: defineMessage({ message: "Decent work and economic growth" }),
    description: defineMessage({
      message:
        "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    }),
  },
  {
    number: 9,
    label: defineMessage({
      message: "Industry, innovation and infrastructure",
    }),
    description: defineMessage({
      message:
        "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    }),
  },
  {
    number: 10,
    label: defineMessage({ message: "Reduced inequalities" }),
    description: defineMessage({
      message: "Reduce inequality within and among countries.",
    }),
  },
  {
    number: 11,
    label: defineMessage({ message: "Sustainable cities and communities" }),
    description: defineMessage({
      message:
        "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    }),
  },
  {
    number: 12,
    label: defineMessage({ message: "Responsible consumption and production" }),
    description: defineMessage({
      message: "Ensure sustainable consumption and production patterns.",
    }),
  },
  {
    number: 13,
    label: defineMessage({ message: "Climate action" }),
    description: defineMessage({
      message: "Take urgent action to combat climate change and its impacts.",
    }),
  },
  {
    number: 14,
    label: defineMessage({ message: "Life below water" }),
    description: defineMessage({
      message:
        "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    }),
  },
  {
    number: 15,
    label: defineMessage({ message: "Life on land" }),
    description: defineMessage({
      message:
        "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss .",
    }),
  },
  {
    number: 16,
    label: defineMessage({ message: "Peace, justice and strong institutions" }),
    description: defineMessage({
      message:
        "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels.",
    }),
  },
  {
    number: 17,
    label: defineMessage({ message: "Partnerships for the goals" }),
    description: defineMessage({
      message:
        "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development.",
    }),
  },
];

export const getSdg = (number) => SDGS.find((sdg) => sdg.number === number);
export const getSdgs = () => SDGS;
