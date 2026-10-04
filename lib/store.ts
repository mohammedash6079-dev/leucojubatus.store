import {demoProducts} from './demo'; import {prisma} from './prisma'; import {StoreProduct} from './types';
export async function products():Promise<StoreProduct[]>{
 if(!process.env.DATABASE_URL)return demoProducts;
 try{const rows=await prisma.product.findMany({where:{active:true},include:{images:{orderBy:{sort:'asc'}},variants:true},orderBy:{createdAt:'desc'}}); return rows.map((x:any)=>({id:x.id,name:x.name,slug:x.slug,description:x.description,sku:x.sku,category:x.category||'New Arrivals',price:Math.min(...x.variants.map((v:any)=>v.price)),fabric:x.fabric||'Premium garment fabric',fit:x.fit||'Regular fit',care:x.care||'Follow garment care label.',images:x.images.map((i:any)=>i.url),colors:[...new Set(x.variants.map((v:any)=>v.color))] as string[],sizes:[...new Set(x.variants.map((v:any)=>v.size))] as string[],stock:x.variants.reduce((a:number,v:any)=>a+v.stock,0)}));}catch{return demoProducts}
}
export async function productBySlug(slug:string){return (await products()).find(p=>p.slug===slug)}
