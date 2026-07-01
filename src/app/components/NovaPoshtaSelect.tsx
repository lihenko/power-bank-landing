"use client";

import { useEffect, useState } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Control, Controller, useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { OrderFormData } from "@/app/lib/order-schema";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type City = {
  ref: string;
  name: string;
};

type Warehouse = {
  ref: string;
  name: string;
};

interface Props {
  control: Control<OrderFormData>;
}

export default function NovaPoshtaSelect({ control }: Props) {
  const { setValue } = useFormContext<OrderFormData>();

  const [cities, setCities] = useState<City[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const [cityOpen, setCityOpen] = useState(false);
  const [warehouseOpen, setWarehouseOpen] = useState(false);

  const [cityQuery, setCityQuery] = useState("");
  const [warehouseQuery, setWarehouseQuery] = useState("");

  const [loadingWarehouses, setLoadingWarehouses] = useState(false);

  useEffect(() => {
    if (cityQuery.length < 2) {
      setCities([]);
      return;
    }

    const timeout = setTimeout(async () => {
      const res = await fetch(
        `/api/nova-poshta/cities?q=${encodeURIComponent(cityQuery)}`
      );

      setCities(await res.json());
    }, 300);

    return () => clearTimeout(timeout);
  }, [cityQuery]);

  return (
    <>
      {/* CITY */}

      <Controller
        control={control}
        name="novaCity"
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <label className="font-medium">Місто</label>

            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={cityOpen}
              onClick={() => setCityOpen(true)}
              className="w-full justify-between font-normal"
            >
              {field.value?.name ?? "Оберіть місто"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            <CommandDialog
              open={cityOpen}
              onOpenChange={setCityOpen}
              title="Пошук міста"
              description="Введіть назву міста для пошуку"
            >
              <Command shouldFilter={false}>
                <CommandInput
                  placeholder="Пошук міста..."
                  value={cityQuery}
                  onValueChange={setCityQuery}
                />

                <CommandList>
                  <CommandEmpty>
                    {cityQuery.length < 2
                      ? "Введіть мінімум 2 символи"
                      : "Нічого не знайдено"}
                  </CommandEmpty>

                  <CommandGroup>
                    {cities.map((city) => (
                      <CommandItem
                        key={city.ref}
                        value={city.ref}
                        onSelect={async () => {
                          field.onChange(city);
                          setCityOpen(false);

                          // скидаємо відділення при зміні міста
                          setValue("novaWarehouse", undefined);
                          setWarehouses([]);
                          setWarehouseQuery("");
                          setLoadingWarehouses(true);

                          try {
                            const res = await fetch(
                              `/api/nova-poshta/warehouses?cityRef=${city.ref}`
                            );

                            setWarehouses(await res.json());
                          } finally {
                            setLoadingWarehouses(false);
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            field.value?.ref === city.ref
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />

                        {city.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>

            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />

      {/* WAREHOUSE */}

      <Controller
        control={control}
        name="novaWarehouse"
        render={({ field, fieldState }) => (
          <div className="space-y-2 mt-6">
            <label className="font-medium">Відділення</label>

            <Button
              type="button"
              variant="outline"
              role="combobox"
              aria-expanded={warehouseOpen}
              disabled={warehouses.length === 0}
              onClick={() => setWarehouseOpen(true)}
              className="w-full justify-between font-normal"
            >
              {field.value?.name ?? "Оберіть відділення"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>

            <CommandDialog
              open={warehouseOpen}
              onOpenChange={setWarehouseOpen}
              title="Пошук відділення"
              description="Введіть номер або адресу відділення"
            >
              <Command>
                <CommandInput
                  placeholder="Пошук відділення..."
                  value={warehouseQuery}
                  onValueChange={setWarehouseQuery}
                />

                <CommandList>
                  <CommandEmpty>
                    {loadingWarehouses ? "Завантаження..." : "Нічого не знайдено"}
                  </CommandEmpty>

                  <CommandGroup>
                    {warehouses
                      .filter((w) =>
                        w.name.toLowerCase().includes(warehouseQuery.toLowerCase())
                      )
                      .map((warehouse) => (
                        <CommandItem
                          key={warehouse.ref}
                          value={warehouse.name}
                          onSelect={() => {
                            field.onChange(warehouse);
                            setWarehouseOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              field.value?.ref === warehouse.ref
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />

                          {warehouse.name}
                        </CommandItem>
                      ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </CommandDialog>

            {fieldState.error && (
              <p className="text-sm text-red-500">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </>
  );
}