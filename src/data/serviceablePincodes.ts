export const serviceablePincodes: string[] = [
  "411001", // Koregaon Park
  "411002", // Camp
  "411003", // Shivajinagar
  "411004", // Deccan
  "411005", // Erandwane
  "411006", // Model Colony
  "411007", // Kothrud
  "411008", // Karve Nagar
  "411009", // Warje
  "411011", // Pune City
  "411013", // Hadapsar
  "411014", // Bibwewadi
  "411015", // Gultekdi
  "411016", // Dhanori
  "411017", // Wakad
  "411021", // Baner
  "411022", // Aundh
  "411023", // Bavdhan
  "411027", // Pimple Saudagar
  "411028", // Pimple Nilakh
  "411029", // Pimpri
  "411030", // Chinchwad
  "411033", // Akurdi
  "411038", // Ravet
  "411039", // Tathawade
  "411041", // Pashan
  "411044", // Hinjewadi
  "411045", // Balewadi
  "411057", // Viman Nagar
  "411058", // Kalyani Nagar
];

export function isPincodeServiceable(pincode: string): boolean {
  return serviceablePincodes.includes(pincode.trim());
}
