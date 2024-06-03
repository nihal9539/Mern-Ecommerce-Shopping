import { Country, State, } from "country-state-city";
import { useEffect, useState } from "react";

const useCountries = () => {

  const allStates = [];
  State.getStatesOfCountry('IN').map((country) => {
    allStates.push(country.name);
  });
  return {allStates};
}

export default useCountries;
