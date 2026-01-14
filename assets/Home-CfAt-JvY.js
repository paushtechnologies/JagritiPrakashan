import{r as s,j as e,B as a,I as N,P as B,S as g,T as S,C as E,u as P}from"./index-HQq-A0_w.js";import{C as z}from"./ChevronLeft-7D4HLdNt.js";import{B as R}from"./BookCard-C1itt16m.js";import{S as M}from"./SEO-Cjb56_Ok.js";import{C as T,a as W}from"./DialogContent-Cqk4U2z5.js";import{A as _}from"./ArrowForwardIos-MNf5alaA.js";import"./Stack-jF9wnkyf.js";import"./Dialog-2E3yvBux.js";const $=6e3,O=2e3;function q({books:i=[],bannerMode:x=!1,autoPlay:u=!0}){const[p,m]=s.useState(0),[h,C]=s.useState(u),[d,b]=s.useState(null),[w,j]=s.useState(null),[I,v]=s.useState(!1),y=typeof window<"u"&&window.matchMedia("(max-width:600px)").matches,f=x?1:4,r=Math.max(0,Math.ceil(i.length/f)-1);s.useEffect(()=>{if(!h||r===0)return;const o=setInterval(()=>{m(c=>c<r?c+1:0)},$);return()=>clearInterval(o)},[h,r,p]);const t=()=>{m(o=>o>0?o-1:r)},l=()=>{m(o=>o<r?o+1:0)},n=s.useMemo(()=>{if(!x||!i.length)return null;const o=i[p*f];return o?`/banners/${y&&o.bannerMobile||o.banner}`:null},[i,p,f,y,x]);s.useEffect(()=>{if(!n)return;if(!d){const c=new Image;c.src=n,c.onload=()=>{b(n)};return}if(n===d)return;const o=new Image;o.src=n,o.onload=()=>{j(n),v(!0),setTimeout(()=>{b(n),j(null),v(!1)},O)}},[n,d]);const k=7,A=Array.from({length:k});return e.jsxs(a,{sx:{position:"relative",overflow:"hidden"},children:[e.jsx("style",{children:`
          /* EXTRA SOFT EASING */
          @keyframes sliceEnter {
            0% { 
              opacity: 0; 
              transform: translateX(30px) scale(1.05); /* Reduced movement, subtle scale */
            }
            100% { 
              opacity: 1; 
              transform: translateX(0) scale(1); 
            }
          }

          .slice-container {
            position: absolute;
            inset: 0;
            display: flex;
            width: 100%;
            height: 100%;
          }

          .slice-item {
            position: relative;
            height: 100%;
            flex: 1; 
            /* 101% width to overlap seams */
            width: calc(100% / ${k} + 1px);
            margin-right: -1px;
            
            background-size: ${k*100}% 100%;
            background-repeat: no-repeat;
            will-change: transform, opacity;
          }

          /* Staggered animation for slices - Ultra Smooth */
          ${A.map((o,c)=>`
            .slice-anim-${c} {
              animation: sliceEnter 1.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              animation-delay: ${c*100}ms; 
            }
          `).join("")}
        `}),e.jsx(N,{onClick:t,sx:{position:"absolute",left:{xs:0,md:3},top:"50%",transform:"translateY(-50%)",zIndex:20,bgcolor:{xs:"transparent",md:"rgba(0,0,0,0.25)"},backdropFilter:{xs:"none",md:"blur(4px)"},border:{xs:"none",md:"1px solid rgba(255,255,255,0.2)"},"&:hover":{bgcolor:{xs:"transparent",md:"rgba(0,0,0,0.5)"},borderColor:"#fff"},color:"#fff",width:{xs:32,md:48},height:{xs:32,md:48},padding:{xs:0,md:1},justifyContent:{xs:"flex-start",md:"center"}},children:e.jsx(z,{sx:{fontSize:{xs:24,md:32},filter:"drop-shadow(0 2px 3px rgba(0,0,0,0.7))"}})}),e.jsxs(B,{elevation:0,sx:{position:"relative",aspectRatio:{xs:"800 / 400",md:"1400 / 360"},minHeight:{md:300},backgroundColor:"transparent",overflow:"hidden",borderRadius:0},children:[!d&&e.jsx(g,{variant:"rectangular",width:"100%",height:"100%",animation:"wave",sx:{transform:"scale(1)",bgcolor:"rgba(0,0,0,0.1)"}}),d&&e.jsx(a,{sx:{position:"absolute",inset:0,backgroundImage:`url(${d})`,backgroundSize:"cover",backgroundPosition:"center",zIndex:1}}),w&&I&&e.jsx(a,{className:"slice-container",sx:{zIndex:2},children:A.map((o,c)=>e.jsx(a,{className:`slice-item slice-anim-${c}`,sx:{backgroundImage:`url(${w})`,backgroundPosition:`${c/(k-1)*100}% center`}},c))}),e.jsx(a,{sx:{position:"absolute",bottom:16,left:16,zIndex:10},children:e.jsx(S,{variant:"h6",color:"#fff",sx:{textShadow:"0 2px 4px rgba(0,0,0,0.8)"},children:i[p]?.title||""})})]}),e.jsx(N,{onClick:l,sx:{position:"absolute",right:{xs:0,md:3},top:"50%",transform:"translateY(-50%)",zIndex:20,bgcolor:{xs:"transparent",md:"rgba(0,0,0,0.25)"},backdropFilter:{xs:"none",md:"blur(4px)"},border:{xs:"none",md:"1px solid rgba(255,255,255,0.2)"},"&:hover":{bgcolor:{xs:"transparent",md:"rgba(0,0,0,0.5)"},borderColor:"#fff"},color:"#fff",width:{xs:32,md:48},height:{xs:32,md:48},padding:{xs:0,md:1},justifyContent:{xs:"flex-end",md:"center"}},children:e.jsx(E,{sx:{fontSize:{xs:24,md:32},filter:"drop-shadow(0 2px 3px rgba(0,0,0,0.7))"}})})]})}function K({books:i=[],addToCart:x,loading:u=!1}){const p=P(),m=s.useRef(null),h=s.useRef({}),[C,d]=s.useState({}),b=s.useMemo(()=>i.filter(r=>r.display==="card").slice(0,8),[i]),w=s.useMemo(()=>{const r=new Set;return i.filter(t=>t.display==="card").forEach(t=>r.add(t.category)),Array.from(r)},[i]),j=s.useMemo(()=>{const r={};return i.filter(t=>t.display==="card").forEach(t=>{r[t.category]||(r[t.category]=[]),r[t.category].push(t)}),r},[i]),I=s.useMemo(()=>[{banner:"1.png",bannerMobile:"1-mobile.png"},{banner:"2.png",bannerMobile:"2-mobile.png"},{banner:"3.png",bannerMobile:"3-mobile.png"},{banner:"4.png",bannerMobile:"4-mobile.png"},{banner:"5.png",bannerMobile:"5-mobile.png"}],[]),v=s.useCallback(r=>{const t=h.current[r];t&&d(l=>{const n=t.scrollWidth>t.clientWidth+4;return l[r]===n?l:{...l,[r]:n}})},[]),y=s.useCallback(r=>{h.current[r]?.scrollBy({left:420,behavior:"smooth"})},[]);s.useEffect(()=>{if(!m.current)return;const r=new IntersectionObserver(t=>{t.forEach(l=>{l.isIntersecting&&(l.target.classList.add("visible"),r.unobserve(l.target))})},{threshold:.18,rootMargin:"0px 0px -40px 0px"});return requestAnimationFrame(()=>{m.current.querySelectorAll(".reveal").forEach(t=>r.observe(t))}),()=>r.disconnect()},[i,u]);const f=(r=5)=>e.jsx(a,{className:"scroll-row",sx:{display:"flex",gap:2,overflowX:"hidden",pb:2,pt:1},children:Array.from(new Array(r)).map((t,l)=>e.jsxs(a,{sx:{flex:{xs:"0 0 100px",sm:"0 0 150px"}},children:[e.jsx(g,{variant:"rectangular",height:220,width:"100%",sx:{borderRadius:2},animation:"wave"}),e.jsx(g,{width:"80%",sx:{mt:1},animation:"wave"}),e.jsx(g,{width:"40%",animation:"wave"})]},l))});return e.jsxs(a,{ref:m,sx:{mt:{xs:1,sm:2},maxWidth:1400,mx:"auto"},children:[e.jsx(M,{title:"Jagriti Prakashan",appendSiteTitle:!1,description:"Jagriti Prakashan Publication is the official online bookstore for authentic Indian literature, competitive exam resources, school books, and cultural titles—trusted by educators, parents, and readers across India.",keywords:"jagriti prakashan, jagriti publication, jagriti prakashan publication, indian books, competitive exam books, school books, hindu philosophy, social studies",canonical:"https://www.jagritiprakashan.com/",structuredData:[{"@context":"https://schema.org","@type":"WebSite",name:"Jagriti Prakashan",url:"https://www.jagritiprakashan.com/",potentialAction:{"@type":"SearchAction",target:"https://www.jagritiprakashan.com/search?query={search_term_string}","query-input":"required name=search_term_string"}},{"@context":"https://schema.org","@type":"BookStore",name:"Jagriti Prakashan Publication",alternateName:"Jagriti Prakashan",url:"https://www.jagritiprakashan.com/",email:"jagritiprakashan01@gmail.com",sameAs:["https://www.facebook.com/people/Jagriti-Prakashan/pfbid0WKsV28NucvBEDtmmq7x3Sa6gK9ZjyWZWLqHhptK3V6HC687TR4fnrmLRouSGi3Svl/","https://www.youtube.com/@JagritiPrakashan","https://www.jagritiprakashan.com/"]},{"@context":"https://schema.org","@type":"SiteNavigationElement",name:["Home","Gallery","Search","Gallery","About Us","Media","Pay"],url:["https://www.jagritiprakashan.com/","https://www.jagritiprakashan.com/gallery","https://www.jagritiprakashan.com/search","https://www.jagritiprakashan.com/gallery","https://www.jagritiprakashan.com/about","https://www.jagritiprakashan.com/media","https://www.jagritiprakashan.com/pay"]}]}),e.jsx(a,{sx:{mb:{xs:2,sm:4},borderRadius:{xs:"14px",sm:"32px"},overflow:"hidden",boxShadow:"0 10px 40px -10px rgba(0,0,0,0.15)"},children:e.jsx(q,{books:I,bannerMode:!0})}),e.jsx(a,{className:"animated-border",sx:{position:"relative",borderRadius:{xs:"14px",sm:"32px"},overflow:"hidden"},children:e.jsxs(a,{sx:{p:{xs:1.15,sm:3}},children:[e.jsx(S,{sx:{mb:{xs:0,sm:0},fontWeight:600,color:"#56524cff",fontSize:{xs:20,sm:28}},children:"Featured"}),u&&i.length===0?f(6):e.jsx(a,{className:"scroll-row",sx:{display:"flex",gap:{xs:2,md:3},overflowX:"auto",pb:{xs:1,md:2},pt:1},children:b.map(r=>e.jsx(a,{sx:{flex:{xs:"0 0 100px",sm:"0 0 150px"}},children:e.jsx(R,{book:r,onAddToCart:x})},r.id))})]})}),e.jsx(a,{sx:{mt:{xs:2,sm:6}},children:u&&i.length===0?Array.from(new Array(2)).map((r,t)=>e.jsxs(a,{className:"reveal",sx:{mb:{xs:1,md:4},p:{xs:2,md:2}},children:[e.jsx(g,{width:200,height:40,sx:{mb:2}}),f(6)]},t)):w.map((r,t)=>{const l=j[r]||[];return e.jsxs(a,{className:"reveal",sx:{mb:{xs:2,md:4},bgcolor:t%2===0?"rgba(13,27,42,0.05)":"transparent",p:{xs:1,md:2},borderRadius:1},children:[e.jsx(S,{fontSize:{xs:20,md:32},fontWeight:700,color:"#b8792e",mb:.5,children:r}),e.jsxs(a,{sx:{display:"flex"},children:[e.jsx(a,{className:"scroll-row",ref:n=>{h.current[r]=n,n&&requestAnimationFrame(()=>v(r))},sx:{display:"flex",gap:{xs:2,md:3},overflowX:"auto",pb:{xs:1,md:2},pt:{xs:0,md:1}},children:l.map(n=>e.jsx(a,{sx:{flex:{xs:"0 0 100px",sm:"0 0 150px"}},children:e.jsx(R,{book:n,onAddToCart:x})},n.id))}),C[r]&&e.jsx(T,{sx:{ml:1,minWidth:{xs:20,md:30},bgcolor:"#f0b04f",display:"flex",alignItems:"center",cursor:"pointer"},onClick:()=>y(r),children:e.jsx(W,{sx:{p:0},children:e.jsx(_,{sx:{color:"#fff"}})})})]})]},r)})}),e.jsxs(a,{className:"reveal",sx:{mt:{xs:2,md:4},textAlign:"center"},children:[e.jsx(S,{variant:"h6",children:"Want to see all books?"}),e.jsx(a,{component:"button",onClick:()=>p("/gallery"),sx:{mt:{xs:1,md:2},px:{xs:2,md:4},py:{xs:1.25,md:1.5},bgcolor:"primary.main",color:"#fff",border:"none",borderRadius:1,fontWeight:700,cursor:"pointer"},children:"Open Gallery"})]}),e.jsx("style",{children:`
          .reveal {
            opacity: 0;
            transform: translateY(28px) scale(0.98);
            transition:
              opacity 700ms cubic-bezier(.2,.6,.2,1),
              transform 700ms cubic-bezier(.2,.6,.2,1);
          }

          /* 🔑 show first two sections (Banner & Bestsellers) immediately for a full fold */
          .reveal.visible {
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .animated-border::before {
            content: "";
            position: absolute;
            inset: -2px;
            border-radius: inherit;
            background: conic-gradient(
              from 0deg,
              transparent 0deg,
              #f1950aff 90deg,
              transparent 180deg,
              #f0b04f 270deg,
              transparent 360deg
            );
            animation: rotateBorder 22s linear infinite;
            z-index: 0;
          }

          .animated-border::after {
            content: "";
            position: absolute;
            inset: 3px;
            background: linear-gradient(
              90deg,
              #f8c978 0%,
              #fde9c3 30%,
              #fdf6e6 60%,
              #edc27dff 100%
            );
            border-radius: inherit;
            z-index: 1;
          }

          .animated-border > * {
            position: relative;
            z-index: 2;
          }

          @keyframes rotateBorder {
            to { transform: rotate(360deg); }
          }

          .scroll-row::-webkit-scrollbar {
            height: 5px;
          }

          .scroll-row::-webkit-scrollbar-thumb {
            background-color: rgba(0,0,0,0.35);
            border-radius: 10px;
          }

          @media (max-width: 768px) {
            .scroll-row::-webkit-scrollbar {
              height: 3px;
            }

            .scroll-row::-webkit-scrollbar-thumb {
              background-color: rgba(0,0,0,0.15);
            }
          }
        `})]})}export{K as default};
