import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { CustomButton } from '@/components/ui/custom-button';

export const Notification = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <CustomButton>
          <FontAwesomeIcon icon={faBell} />
        </CustomButton>
      </PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
  );
};
