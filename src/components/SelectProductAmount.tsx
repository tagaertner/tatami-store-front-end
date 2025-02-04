import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export enum Mode {
  SingleProduct = 'singleProduct',
  CartItem = 'cartItem',
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => void;
};

function SelectProductAmount({
  mode,
  amount,
  setAmount,
}: SelectProductAmountProps | SelectCartItemAmountProps) {
  const cartItem = mode === Mode.CartItem;
  // Ensure amount is always defined (fallback to 0 if undefined)
  const safeAmount = amount ?? 0;
  
  return (
    <>
      <h4 className='font-medium mb-2'>Amount :</h4>
      <Select
        defaultValue={safeAmount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
      >
        <SelectTrigger className={cartItem ? 'w-[75px]' : 'w-[150px]'}>
          <SelectValue placeholder={safeAmount.toString()} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: cartItem ? safeAmount + 10 : 10 }, (_, index) => {
            const selectValue = (index + 1).toString();
            return (
              <SelectItem key={index} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
}

export default SelectProductAmount;