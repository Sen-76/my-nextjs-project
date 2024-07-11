'use client';

import React from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@/components/ui/checkbox';

interface IFilterSheet {
  openSheet: boolean;
}
const FilterSheet = (props: IFilterSheet) => {
  const { openSheet } = props;
  const formSchema = z.object({});

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: A) => {
    try {
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  const status = [
    {
      id: `Didn't Play`,
      label: 'Did not play',
    },
    {
      id: 'In Progress',
      label: 'InProgress',
    },
    {
      id: 'Wait for Update',
      label: 'Downloads',
    },
    {
      id: 'Done',
      label: 'Done',
    },
  ] as const;

  const langs = [
    {
      id: `En`,
      label: 'English',
    },
    {
      id: 'Vn',
      label: 'Vietnamese',
    },
    {
      id: 'Jp',
      label: 'Japanese',
    },
    {
      id: 'Cn',
      label: 'Chinese',
    },
  ] as const;

  return (
    <div
      style={{ width: openSheet ? '450px' : 0, marginLeft: openSheet ? '20px' : 0, padding: openSheet ? '20px' : 0 }}
      className="overflow-hidden transition-all duration-700 border-l-2 border h-[calc(100% + 80px)] bg-slate-300/40 mr-[-32px] my-[-40px]"
    >
      <div className="font-bold mb-5">Filter Sheet</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Search Title</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input placeholder="Input contain key word..." {...field} className="!mt-0" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute top-3 right-3 opacity-50" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold">Language</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {status.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="status"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 w-[45%]">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field?.value ?? []), item.id])
                                    : field.onChange(field?.value?.filter((value: A) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lang"
            render={() => (
              <FormItem>
                <FormLabel className="font-semibold">Status</FormLabel>
                <div className="flex flex-wrap gap-2">
                  {langs.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="status"
                      render={({ field }) => {
                        return (
                          <FormItem key={item.id} className="flex flex-row items-center space-x-3 space-y-0 w-[45%]">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field?.value ?? []), item.id])
                                    : field.onChange(field?.value?.filter((value: A) => value !== item.id));
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal cursor-pointer">{item.label}</FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default FilterSheet;
