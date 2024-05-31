'use client';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import FormGroup from '@/components/ui/form-group';
import { Input, InputProps as OriginalInputProps } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { rate } from '@/config/dao-config';
import { ApiContext } from '@/context/api-context';
import { AppContext } from '@/context/app-context';
import {
  cn,
  handleChangeFormNumberInput,
  handleMinus,
  handlePlus,
} from '@/libs/utils';
import { Loader, Minus, Plus, Trash2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useContext, useState } from 'react';
import { FieldValues, UseFormReturn, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';

interface ISelectFormField {
  form: any;
  filterData: { title: string; enums: number }[];
  handleReset: (arg: string) => void;
}

const SelectFormField = ({
  form,
  filterData,
  handleReset,
}: ISelectFormField) => {
  const searchParams = useSearchParams();
  const type: string = searchParams.get('enums') || '';

  return (
    <FormField
      control={form.control}
      name="type"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Title</FormLabel>
          <Select
            onValueChange={(value) => {
              field.onChange(value);
              handleReset(value);
            }}
            // setNewProposalInfo({ value: {...newProposalInfo, type: field.type} });
            defaultValue={field.value}
            disabled={type === '9'}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue
                  placeholder="Choose title"
                  className="dark:text-white placeholder:text-[#444444] text-dark"
                />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {filterData.map((list: { title: string; enums: number }) => (
                <SelectItem value={list.enums.toString()} key={list.title}>
                  {list.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
type InputProps = Omit<OriginalInputProps, 'form'>;

interface TextFormFieldProps extends InputProps {
  form: UseFormReturn<FieldValues>;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
}

const TextFormField: React.FC<TextFormFieldProps> = ({
  form,
  name,
  label,
  placeholder,
  type,
  ...props
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              placeholder={placeholder}
              type={type || 'text'}
              {...field}
              {...props}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const EquivalentValueFormField = ({ form }: { form: any }) => {
  const { loadingAePrice, getAEPrice } = useContext(ApiContext);
  const handleBlur = (field: { value: string }) => {
    const value = Number(field.value) * (getAEPrice?.price || rate);
    if (Number.isNaN(value)) {
      form.setError('value', {
        type: 'onChange',
        message: 'Please provide a valid amount',
      });
      return;
    }
  };

  return (
    <FormField
      control={form.control}
      name="value"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Value (AE)</FormLabel>
          <FormControl>
            <FormGroup>
              <Input
                placeholder="value"
                type="number"
                {...field}
                onBlur={() => handleBlur(field)}
              />

              {loadingAePrice ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <p className="text-xs font-light text-[#888888] absolute right-4">
                  {field.value
                    ? Number(field.value) * (getAEPrice?.price || rate)
                    : 0}{' '}
                  <span className="text-[10px]">USD</span>
                </p>
              )}
            </FormGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const ProposalDurationFormField = ({ form }: { form: any }) => {
  const proposalType = Number(form.getValues('type'));
  return (
    <FormField
      control={form.control}
      name="duration"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Proposal Duration</FormLabel>
          <FormControl>
            <FormGroup className="lg:space-x-6 space-x-3">
              <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[80%] lg:w-[50%] border-[#CCCCCC99]">
                <div
                  className={cn(
                    'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2] hover:bg-[#D2D2D2] cursor-not-allowed'
                  )}
                  role="button"
                  onClick={() => null}
                >
                  <Minus size={18} />
                </div>
                <Input
                  placeholder="value"
                  type="number"
                  className="border-none dark:bg-[#191919] w-[50%] lg:w-fit text-center bg-white"
                  readOnly
                  {...field}
                  onChange={() => null}
                />
                <div
                  className={cn(
                    'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans hover:bg-[#D2D2D2] bg-[#D2D2D2] cursor-not-allowed'
                  )}
                  role="button"
                  onClick={() => null}
                >
                  <Plus size={18} />
                </div>
              </div>
              <p className="text-white font-light text-xs md:text-sm">Days</p>
            </FormGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const QuorumFormField = ({
  form,
  isDisabled,
}: {
  form: any;
  isDisabled?: boolean;
}) => {
  return (
    <FormField
      control={form.control}
      name="quorum"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Proposal Quorum</FormLabel>
          <FormControl>
            <FormGroup className="lg:space-x-6 lg:flex block space-y-2 lg:space-y-0">
              <div className="border dark:border-[#292929] flex items-center justify-between rounded-lg py-1 px-5 w-[50%] border-[#CCCCCC99]">
                <div
                  className={cn(
                    'dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2]'
                  )}
                  role="button"
                  onClick={() => {
                    !isDisabled
                      ? field.value === 1
                        ? null
                        : handleMinus('quorum', form)
                      : null;
                  }}
                >
                  <Minus size={18} />
                </div>
                <Input
                  placeholder="value"
                  type="number"
                  className="border-none dark:bg-[#191919] w-[50%] lg:w-fit text-center bg-white"
                  readOnly={isDisabled}
                  {...field}
                  onChange={({ target }) =>
                    !isDisabled
                      ? handleChangeFormNumberInput(
                          'quorum',
                          target.value,
                          form
                        )
                      : null
                  }
                />
                <div
                  className="dark:bg-[#1E1E1E] rounded-lg py-2 px-2 dark:hover:bg-[#2a2a2a] trans bg-[#D2D2D2]"
                  role="button"
                  onClick={() =>
                    !isDisabled ? handlePlus('quorum', form) : null
                  }
                >
                  <Plus size={18} />
                </div>
              </div>
              <div className="flex space-x-3">
                <Checkbox
                  id="proposalCheck"
                  className="rounded-full border-[#5BE950] data-[state=checked]:bg-[#5BE950]"
                  checked={field.value >= 50}
                />
                <label
                  htmlFor="proposalCheck"
                  className="dark:text-[#FFF] text-xs md:text-sm text-dark"
                >
                  Proposal will be approved by many
                </label>
              </div>
            </FormGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const UploadFileFormField = ({ form }: { form: any }) => {
  const { setNewProposalInfo, newProposalInfo } = useContext(AppContext);
  const [onUploadUrl, setOnUploadUrl] = useState<string>(
    newProposalInfo.value.logo || ''
  );

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const maxSize: number = 3 * 1024 * 1024;
    const file: any = e.target.files?.[0];
    if (file.size >= maxSize) {
      toast.error('File is too large. Max size of 3mb');
    } else {
      // setLogoFormData(file);

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result as string;
          setOnUploadUrl(result);
          form.setValue('logo', file);
          form.setError('logo', { message: '' });
          const updatedData = {
            value: { ...newProposalInfo.value, logo: result },
          };
          setNewProposalInfo(updatedData);
          localStorage.setItem('new_proposal', JSON.stringify(updatedData));
        };
        reader.readAsDataURL(file);
      }
    }
  };

  return (
    <FormField
      control={form.control}
      name="logo"
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            Logo <span className="text-[#DD3857]">*</span>
            <span className="text-[#888888] text-sm">
              {' '}
              JPG, PNG, or SVG of not more than 3MB.
            </span>
          </FormLabel>
          <FormControl>
            <FormGroup>
              {onUploadUrl && (
                <div className="flex space-x-2 items-end">
                  <img
                    src={onUploadUrl}
                    alt="logo"
                    className="rounded-lg h-[50px] w-[50px] object-cover"
                  />
                  <p className="text-[10px]">Change</p>
                </div>
              )}
              {!onUploadUrl && (
                <div
                  className="dark:bg-[#1E1E1E] bg-light text-dark dark:text-defaultText h-[50px] w-[50px] rounded-lg flex items-center justify-center"
                  role="button"
                >
                  <Plus />
                </div>
              )}
              <Input
                type="file"
                className="absolute h-full border-b border-0 w-fit rounded-none inset-0 cursor-pointer opacity-0"
                accept=".jpg, .jpeg, .png"
                onChange={handleUpload}
              />
            </FormGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const UpdateSocialsFormField = ({ form }: { form: any }) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'socialMedia',
  });
  return (
    <div className="space-y-4">
      <h2 className="font-medium text-dark dark:text-white">
        Social Links{' '}
        <span className="text-[#888888] font-light">(Optional)</span>
      </h2>
      <div className="grid grid-cols-2 gap-6">
        <div className="font text-dark dark:text-white text-sm">Type</div>
        <div className="font text-dark dark:text-white text-sm">Link</div>
      </div>
      {fields.map((social: any, index) => (
        <div
          className="flex items-center w-full space-x-4 justify-between"
          key={social.id}
        >
          <div className="grid grid-cols-2 gap-6 w-[95%]">
            <FormField
              control={form.control}
              name={`socialMedia.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Website, Twitter, Instagram"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name={`socialMedia.${index}.link`}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="https://" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-xs font-light text-defaultText">
                Please ensure to start with{' '}
                <span className="text-primary">https://</span>
              </p>
            </div>
          </div>
          {fields.length > 1 && (
            <div className="w-[3%]" role="button" onClick={() => remove(index)}>
              <Trash2 color="#F998A9" size={20} />
            </div>
          )}
        </div>
      ))}
      <div
        className="flex space-x-2 bg-[#1E1E1E] border border-dark text-white w-fit rounded-lg py-2 px-3 items-center justify-center text-xs"
        role="button"
        onClick={() => append({ type: '', link: '' })}
      >
        <Plus className="mr-2 h-4 w-4" />
        Add Link
      </div>
    </div>
  );
};

export {
  SelectFormField,
  TextFormField,
  EquivalentValueFormField,
  ProposalDurationFormField,
  QuorumFormField,
  UploadFileFormField,
  UpdateSocialsFormField,
};
