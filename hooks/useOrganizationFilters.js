import { useState } from "react";
import { defineMessage } from "@lingui/macro";
import { getSdgs } from "helpers/sdg";

const applyFilters = (organizations, { sdg, state }) => {
  return filterByState(filterBySdg(organizations, sdg), state);
};

const filterBySdg = (organizations, sdg) => {
  let key = "total_score";
  if (sdg != "all") key = `sdg${sdg}_score`;

  return [...organizations]
    .filter((organization) => organization[key] > 0)
    .sort((a, b) => b[key] - a[key]);
};

const filterByState = (organizations, state) => {
  if (state === "all") return organizations;

  return organizations.filter((organization) => organization.state === state);
};

const STATES = [
  {
    name: "Baden-Württemberg",
    label: defineMessage({ message: "Baden-Württemberg" }),
  },
  { name: "Bavaria", label: defineMessage({ message: "Bavaria" }) },
  { name: "Berlin", label: defineMessage({ message: "Berlin" }) },
  { name: "Brandenburg", label: defineMessage({ message: "Brandenburg" }) },
  { name: "Bremen", label: defineMessage({ message: "Bremen" }) },
  { name: "Hamburg", label: defineMessage({ message: "Hamburg" }) },
  { name: "Hesse", label: defineMessage({ message: "Hesse" }) },
  { name: "Lower Saxony", label: defineMessage({ message: "Lower Saxony" }) },
  {
    name: "Mecklenburg-Vorpommern",
    label: defineMessage({ message: "Mecklenburg-Vorpommern" }),
  },
  {
    name: "North Rhine-Westphalia",
    label: defineMessage({ message: "North Rhine-Westphalia" }),
  },
  {
    name: "Rhineland-Palatinate",
    label: defineMessage({ message: "Rhineland-Palatinate" }),
  },
  { name: "Saarland", label: defineMessage({ message: "Saarland" }) },
  { name: "Saxony", label: defineMessage({ message: "Saxony" }) },
  { name: "Saxony-Anhalt", label: defineMessage({ message: "Saxony-Anhalt" }) },
  {
    name: "Schleswig-Holstein",
    label: defineMessage({ message: "Schleswig-Holstein" }),
  },
  { name: "Thuringia", label: defineMessage({ message: "Thuringia" }) },
];

const useOrganizationFilters = (organizations) => {
  const [activeSdg, setActiveSdg] = useState("all");
  const [activeState, setActiveState] = useState("all");

  const filteredOrganizations = applyFilters(organizations, {
    sdg: activeSdg,
    state: activeState,
  });

  return {
    filteredOrganizations,
    activeSdg,
    filterBySdg: (event) => setActiveSdg(event.target.value),
    sdgOptions: getSdgs().map((sdg) => ({
      ...sdg,
      disabled:
        applyFilters(organizations, { sdg: sdg.number, state: activeState })
          .length === 0,
    })),
    activeState,
    filterByState: (event) => setActiveState(event.target.value),
    stateOptions: STATES.map((state) => ({
      ...state,
      disabled:
        applyFilters(organizations, { sdg: activeSdg, state: state.name })
          .length === 0,
    })),
  };
};

export default useOrganizationFilters;
