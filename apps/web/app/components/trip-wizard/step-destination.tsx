import type { UseFormReturn } from "react-hook-form";

import type { CreateTripValues } from "~/schemas/trip.schema";
import { CitySearch } from "./city-search";

interface StepDestinationProps {
  form: UseFormReturn<CreateTripValues>;
}

export function StepDestination({ form }: StepDestinationProps) {
  const { watch, setValue, formState } = form;
  const cityLabel = watch("cityLabel");

  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-lg font-semibold text-primary">
          Where do you want to go?
        </h3>
        <p className="text-sm text-muted">
          Pick the city Travix should plan your trip around.
        </p>
      </div>

      <CitySearch
        value={cityLabel}
        onSelect={(cityId, label) => {
          setValue("cityId", cityId, { shouldValidate: true });
          setValue("cityLabel", label);
        }}
      />

      {formState.errors.cityId && (
        <span className="text-xs text-red-500">
          {formState.errors.cityId.message}
        </span>
      )}
    </div>
  );
}
