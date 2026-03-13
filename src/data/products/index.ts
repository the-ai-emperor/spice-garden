import { gulabJamun } from "./gulab-jamun";
import { laddu } from "./laddu";
import { jalebi } from "./jalebi";
import { gajarPaak } from "./gajar-paak";
import { kajuKatli } from "./kaju-katli";
import { rasgulla } from "./rasgulla";
import { rasMalai } from "./ras-malai";
import { barfi } from "./barfi";
import { peda } from "./peda";
import { imarti } from "./imarti";
import { kalakand } from "./kalakand";
import { mango } from "./mango";
import { banana } from "./banana";
import { kiwi } from "./kiwi";
import { gawava } from "./gawava";
import { lychee } from "./lychee";
import { watermalon } from "./watermalon";
import { orange } from "./orange";
import { grapes } from "./grapes";
import { pear } from "./pear";
import { papaya } from "./papaya";
import { poha } from "./poha";
import { pizza } from "./pizza";
import { burger } from "./burger";
import { momos } from "./momos";
import { frenchFries } from "./french-fries";
import { golGappe } from "./gol-gappe";
import { samosa } from "./samosa";
import { kachori } from "./kachori";
import { pacoda } from "./pacoda";
import { aalooTiki } from "./aaloo-tiki";
import { pavBhaji } from "./pav-bhaji";
import { vadaPaav } from "./vada-paav";
import { cocaCola } from "./coca-cola";
import { pepsi } from "./pepsi";
import { redBull } from "./red-bull";
import { sprite } from "./sprite";
import { thumsUp } from "./thums-up";
import { limca } from "./limca";
import { fanta } from "./fanta";
import { mirinda } from "./mirinda";
import { mountainDew } from "./mountain-dew";
import { fizz } from "./fizz";
import { sevTamatar } from "./sev-tamatar";
import { paneer } from "./paneer";
import { alooChhola } from "./aloo-chhola";
import { palakPanner } from "./palak-panner";
import { matarPaneer } from "./matar-paneer";
import { alooSabji } from "./aloo-sabji";
import { alooMatar } from "./aloo-matar";
import { dumAloo } from "./dum-aloo";
import { shahiPanner } from "./shahi-panner";
import { sarsonKaSaag } from "./sarson-ka-saag";
import { kalaChanaSabzi } from "./kala-chana-sabzi";
import { rajmaSabzi } from "./rajma-sabzi";
import { greenVeg } from "./green-veg";
import { chaach } from "./chaach";
import { salad } from "./salad";
import { raita } from "./raita";
import { papadum } from "./papadum";
import { pickle } from "./pickle";
import { chutney } from "./chutney";
import { alooSabjiThali } from "./aloo-sabji-thali";
import { royalPaneerThali } from "./royal-paneer-thali";
import { curryThali } from "./curry-thali";

export * from "./types";
import type { Product } from "./types";

export const allProducts: Product[] = [
  sevTamatar,
  paneer,
  alooChhola,
  palakPanner,
  matarPaneer,
  alooSabji,
  alooMatar,
  dumAloo,
  shahiPanner,
  sarsonKaSaag,
  kalaChanaSabzi,
  rajmaSabzi,
  greenVeg,
  chaach,
  salad,
  raita,
  papadum,
  pickle,
  chutney,
  alooSabjiThali,
  royalPaneerThali,
  curryThali,
  poha,
  pizza,
  burger,
  momos,
  frenchFries,
  golGappe,
  samosa,
  kachori,
  pacoda,
  aalooTiki,
  pavBhaji,
  vadaPaav,
  cocaCola,
  pepsi,
  redBull,
  sprite,
  thumsUp,
  limca,
  fanta,
  mirinda,
  mountainDew,
  fizz,
  gulabJamun,
  laddu,
  jalebi,
  gajarPaak,
  kajuKatli,
  rasgulla,
  rasMalai,
  barfi,
  peda,
  imarti,
  kalakand,
  mango,
  banana,
  kiwi,
  gawava,
  lychee,
  watermalon,
  orange,
  grapes,
  pear,
  papaya,

];
export const categories = ["Sweets", "Fruits", "Fast Food", "Cold Drinks", "Sabji", "Side dishes", "Combos"];
export const featuredProducts = allProducts.filter((p) => p.featured);
export const popularProducts = allProducts.filter((p) => p.popular);
export const getProductBySlug = (slug: string) => allProducts.find((p) => p.slug === slug);
