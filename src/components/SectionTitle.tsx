import { Separator } from "@radix-ui/react-dropdown-menu";

function SectionTitle({text}:{text:string}) {
  return (
    <div>
      <h2 className='text-3xl font-medium tracking-wider capitalize mb-8 mx-auto text-center'>
        {text}
      </h2>
      <Separator />
    </div>
  );
};
export default SectionTitle;