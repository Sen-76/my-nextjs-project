import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import useThemeProviderStore from '@/common/stores/theme-provider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import ColorPicker from 'react-best-gradient-color-picker';
import { H5Header } from '@/components/ui/h5-header';
import { CustomScroll } from 'react-custom-scroll';
import { Label } from '@/components/ui/label';
import debounce from 'lodash.debounce';
import Image from 'next/image';
import { CustomButton } from '@/components/ui/custom-button';

export const ThemeConfigSheet = () => {
  const config = useThemeProviderStore((state) => state);
  const changeBackground = useThemeProviderStore((state) => state.changeBackgroundColor);

  const debouncedSetColor = debounce((newColor) => {
    changeBackground(newColor);
  }, 300);

  return (
    <Sheet>
      <SheetTrigger>
        <CustomButton>
          <FontAwesomeIcon icon={faGear} />
        </CustomButton>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="px-6">
          <SheetTitle>Theme Configurator</SheetTitle>
          <SheetDescription className="!mt-0">See my theme options.</SheetDescription>
        </SheetHeader>
        <CustomScroll heightRelativeToParent="calc(100% - 50px)">
          <Accordion type="single" collapsible className="px-6 py-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <H5Header>Background Color</H5Header>
              </AccordionTrigger>
              <AccordionContent>
                <div className="py-[24px] flex gap-2 justify-center">
                  <div className="flex gap-3 mb-[25px] items-center">
                    <ColorPicker value={config.theme.background} onChange={(val) => debouncedSetColor(val)} />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                <H5Header>Background Image</H5Header>
              </AccordionTrigger>
              <AccordionContent>
                <RadioGroup className="py-[24px] flex justify-between flex-wrap">
                  {config.theme.backgroundImageOption.map((x) => (
                    <ImageOption key={x.src} src={x} />
                  ))}
                </RadioGroup>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CustomScroll>
      </SheetContent>
    </Sheet>
  );
};

interface IImageOption {
  src: A;
}
export const ImageOption = (props: IImageOption) => {
  const changeBackgroundImage = useThemeProviderStore((state) => state.changeBackgroundImage);
  const { src } = props;

  return (
    <div
      className="flex items-start"
      onClick={() => changeBackgroundImage(src.src.includes('backgroundImage0') ? null : src.src)}
    >
      <RadioGroupItem value={src.src} id={src.src} className="z-20 !bg-white ml-1 mt-1" />
      <Label htmlFor={src.src} className="cursor-pointer ml-[-20px]">
        <Image className="object-cover h-24 hover:opacity-70 rounded-lg" width={163} src={src} alt="background-img" />
      </Label>
    </div>
  );
};
