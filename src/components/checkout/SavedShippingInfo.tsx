// import { useAppSelector } from '../../lib/hooks';
// import { Card } from '../ui/card';
// import { RadioGroup} from '../ui/radio-group';
// import { Label } from '../ui/label';
// import { CheckCircle } from 'lucide-react';
// import {SavedShippingInfoProps } from '../../utils/types';



export const SavedShippingInfo = (/* { onSelectShipping, selectedShippingId }: SavedShippingInfoProps */) => {  
// // const shippingInfo = useAppSelector((state) => state.userState.user?.shippingInfo || []);
//   if (!Array.isArray(shippingInfo) || !shippingInfo.length) {
//     return null;
//   }

//   return (
//     <Card className="p-6">
//       <h3 className="text-lg font-semibold mb-4">Saved Shipping Addresses</h3>
//       <RadioGroup
//         value={selectedShippingId}
//         onValueChange={(value) => {
//           const selected = shippingInfo.find(info => info.id === value);
//           if (selected) onSelectShipping(selected);
//         }}
//       >
//         <div className="space-y-4">
//           {shippingInfo.map((info) => (
//             <div key={info.id} className="flex items-center space-x-2">
//               {/* <RadioGroupItem value={info.id} id={info.id} /> */}

  
//               <Label
//                 htmlFor={info.id}
//                 className="flex-1 cursor-pointer p-4 rounded-lg border hover:bg-accent"
//               >
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="font-medium">
//                       {info.name}
//                       {info.isDefault && (
//                         <span className="ml-2 text-sm text-blue-600">(Default)</span>
//                       )}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {info.address}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {info.city}, {info.state} {info.zipCode}
//                     </p>
//                   </div>
//                   {selectedShippingId === info.id && (
//                     <CheckCircle className="h-5 w-5 text-primary" />
//                   )}
//                 </div>
//               </Label>
//             </div>
//           ))}
//         </div>
//       </RadioGroup>
//     </Card>
//   );

  return null;
};