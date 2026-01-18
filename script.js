// Cek preferensi sebelumnya atau sistem OS
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const themeToggleBtn = document.getElementById("theme-toggle");
const darkIcon = document.getElementById("theme-toggle-dark-icon");
const lightIcon = document.getElementById("theme-toggle-light-icon");

// Fungsi untuk update icon
function updateIcons() {
  if (document.documentElement.classList.contains("dark")) {
    lightIcon.classList.remove("hidden");
    darkIcon.classList.add("hidden");
  } else {
    lightIcon.classList.add("hidden");
    darkIcon.classList.remove("hidden");
  }
}
updateIcons();

themeToggleBtn.addEventListener("click", function () {
  // Toggle class dark di html
  document.documentElement.classList.toggle("dark");

  // Simpan preferensi di localStorage
  if (document.documentElement.classList.contains("dark")) {
    localStorage.setItem("color-theme", "dark");
  } else {
    localStorage.setItem("color-theme", "light");
  }
  updateIcons();
});

// 1. DATA MEMBER (DATABASE SIMULATION)
const membersData = [
  {
    id: 1,
    name: "Sarah 'Lens'",
    role: "Photographer",
    quote: "Saya suka memotret bayangan daripada objeknya.",
    photo:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=500&auto=format&fit=crop",
    bio: "Bergabung sejak 2022. Sarah fokus pada fotografi hitam putih dan sering berkeliling pasar tradisional mencari tekstur cahaya.",
    portfolio: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542259682-16b7da5456f5?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517541604467-3a1372863863?q=80&w=500&auto=format&fit=crop",
    ],
  },
  {
    id: 2,
    name: "Dimas Visual",
    role: "Videographer",
    quote: "Gerakan lambat membuat segalanya lebih jujur.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    bio: "Eksperimentalis video yang menggunakan kamera analog dan digital. Fokus pada dokumenter mini tentang pedagang kaki lima.",
    portfolio: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478720568477-152d9b164e63?q=80&w=500&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Raka Art",
    role: "Graphic Designer",
    quote: "Chaos is just structure waiting to be found.",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
    bio: "Membawa elemen jalanan ke dalam desain poster digital. Sering berkolaborasi dengan musisi lokal untuk cover album.",
    portfolio: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e0b7a9?q=80&w=500&auto=format&fit=crop",
    ],
  },
];

// 2. RENDER MEMBERS GRID
const peopleGrid = document.getElementById("people-grid");

// Render Member Cards
membersData.forEach((member, index) => {
  const card = document.createElement("div");
  // Tambahkan class 'group' di sini sebagai pemicu hover
  card.className = "reveal-on-scroll group cursor-pointer relative";
  card.style.transitionDelay = `${index * 100}ms`;
  card.onclick = () => openDrawer(member.id);

  card.innerHTML = `
    <div class="mb-4 overflow-hidden rounded-sm relative aspect-[3/4] bg-neutral-100">
        <img src="${member.photo}" 
             class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out" 
             alt="${member.name}">
        
        <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 z-10 flex items-center justify-center">
            <span class="opacity-0 group-hover:opacity-100 bg-white text-black px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                Lihat Karya
            </span>
        </div>
    </div>
    <h4 class="font-serif text-lg font-medium">${member.name}</h4>
    <p class="text-xs text-neutral-500 uppercase tracking-widest mb-2">${member.role}</p>
    <p class="text-sm text-neutral-600 italic line-clamp-2">"${member.quote}"</p>
    `;
  peopleGrid.appendChild(card);
});

// Render Join Card (Last Item)
const joinCard = document.createElement("div");
joinCard.className =
  "reveal-on-scroll border border-dashed border-neutral-300 flex flex-col items-center justify-center p-8 text-center bg-neutral-50 hover:bg-neutral-100 transition-colors cursor-pointer";
joinCard.onclick = () => document.getElementById("join").scrollIntoView();
joinCard.innerHTML = `
        <div class="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center mb-4"><span class="text-2xl">+</span></div>
        <h4 class="font-serif text-lg font-medium">Kamu?</h4>
        <p class="text-sm text-neutral-500 mt-2">Ruang ini masih kosong.</p>
  `;
peopleGrid.appendChild(joinCard);

// 3. DRAWER LOGIC
function openDrawer(id) {
  const member = membersData.find((m) => m.id === id);
  if (!member) return;

  const drawerBody = document.getElementById("drawer-body");

  // Build Portfolio HTML string
  const portfolioHTML = member.portfolio
    .map(
      (img) => `
        <div class="bg-neutral-100 aspect-square overflow-hidden rounded-sm group">
            <img src="${img}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">
        </div>
    `,
    )
    .join("");

  // Inject Content
  drawerBody.innerHTML = `
        <div class="flex flex-col h-full">
            <div class="flex items-start gap-6 mb-8">
                <img src="${member.photo}" class="w-24 h-24 object-cover rounded-full border border-neutral-200">
                <div>
                    <h2 class="font-serif text-3xl mb-1">${member.name}</h2>
                    <p class="text-xs text-neutral-500 font-bold uppercase tracking-widest mb-3">${member.role}</p>
                    <p class="text-sm text-neutral-600 italic">"${member.quote}"</p>
                </div>
            </div>
            
            <div class="border-t border-neutral-200 py-6 mb-6">
                <h5 class="text-xs font-bold uppercase tracking-widest mb-3 text-neutral-400">Tentang</h5>
                <p class="text-neutral-700 leading-relaxed font-light">${member.bio}</p>
            </div>

            <div class="flex-grow">
                <h5 class="text-xs font-bold uppercase tracking-widest mb-4 text-neutral-400">Selected Works</h5>
                <div class="grid grid-cols-2 gap-4">
                    ${portfolioHTML}
                </div>
            </div>
            
            <div class="mt-8 pt-6 border-t border-neutral-200 text-center">
                <a href="#" class="text-sm font-medium hover:underline">Lihat Profil Lengkap &rarr;</a>
            </div>
        </div>
    `;

  // Open Drawer (Add Classes)
  document.body.classList.remove("drawer-closed");
  document.body.classList.add("drawer-open");
  document.body.style.overflow = "hidden"; // Disable background scroll
}

function closeDrawer() {
  document.body.classList.remove("drawer-open");
  document.body.classList.add("drawer-closed");
  document.body.style.overflow = ""; // Enable background scroll
}

// 4. ANIMATION & INTERACTION LOGIC (Sudah Digabung & Dioptimalkan)
document.addEventListener("DOMContentLoaded", () => {
  // --- Scroll Reveal Observer ---
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-visible");
        obs.unobserve(entry.target); // Stop observing once visible
      }
    });
  }, observerOptions);

  // Observe Static Elements
  document
    .querySelectorAll(".reveal-on-scroll")
    .forEach((el) => observer.observe(el));

  // Observe Dynamic Elements (karena JS render grid butuh waktu sepersekian detik)
  setTimeout(() => {
    document
      .querySelectorAll("#people-grid .reveal-on-scroll")
      .forEach((el) => observer.observe(el));
  }, 100);
});

// 5. MEDIUM FILTER LOGIC
function filterMedium(medium) {
  const buttons = document.querySelectorAll(".filter-btn");

  // Button Active State
  buttons.forEach((btn) => {
    if (
      btn.innerText.toLowerCase() === medium ||
      (medium === "all" && btn.innerText === "All")
    ) {
      btn.classList.remove(
        "text-neutral-500",
        "hover:text-black",
        "bg-transparent",
      );
      btn.classList.add("bg-neutral-100", "text-black");
    } else {
      btn.classList.add(
        "text-neutral-500",
        "hover:text-black",
        "bg-transparent",
      );
      btn.classList.remove("bg-neutral-100", "text-black");
    }
  });

  // Grid Item Display
  const items = document.querySelectorAll(".medium-item");
  items.forEach((item) => {
    if (medium === "all" || item.dataset.medium === medium) {
      item.style.display = "block";
      item.style.opacity = "0";
      setTimeout(() => (item.style.opacity = "1"), 50);
    } else {
      item.style.display = "none";
    }
  });
}

function initStarBorder(elementId, options = {}) {
  const el = document.getElementById(elementId);
  if (!el) return;

  // Set default jika tidak ada di options
  const color = options.color || "white";
  const speed = options.speed || "6s";
  const thickness = options.thickness || 1;

  // Update CSS Variables
  el.style.setProperty("--star-color", color);
  el.style.setProperty("--star-speed", speed);
  el.style.setProperty("--star-thickness", `${thickness}px`);
}

// Cara Penggunaan:
initStarBorder("myStarButton", {
  color: "#008BFF",
  speed: "3s",
  thickness: 2,
});

const navContainer = document.getElementById("nav-main");
const gooeyFilter = document.getElementById("gooey-filter");
const gooeyPill = gooeyFilter.querySelector(".gooey-pill");
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item, index) => {
  item.addEventListener("click", (e) => {
    // 1. Ganti warna teks link asli
    navItems.forEach((nav) => nav.classList.remove("active-text"));
    item.classList.add("active-text");

    // 2. Hitung posisi
    const x = item.offsetLeft;
    const y = item.offsetTop;
    const w = item.offsetWidth;
    const h = item.offsetHeight;

    // 3. Pindahkan Pill Hitam
    gooeyPill.style.left = `${x}px`;
    gooeyPill.style.top = `${y}px`;
    gooeyPill.style.width = `79px`;
    gooeyPill.style.height = `${h}px`;

    // 4. Reset & Trigger Animasi
    gooeyFilter.classList.remove("active");
    void gooeyFilter.offsetWidth;
    gooeyFilter.classList.add("active");

    // 5. Munculkan partikel yang 'menyerap' ke pusat item
    spawnAbsorbParticles(x + w / 2, y + h / 2);
  });
});

function spawnAbsorbParticles(cx, cy) {
  const particleCount = 12;
  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.className = "particle";

    const size = Math.random() * 15 + 8;
    const angle = (i / particleCount) * Math.PI * 2;
    const distance = 60 + Math.random() * 40; // Jarak awal partikel dari luar

    // Posisi awal (relatif terhadap titik pusat item)
    const startX = Math.cos(angle) * distance;
    const startY = Math.sin(angle) * distance;

    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${cx - size / 2}px`;
    p.style.top = `${cy - size / 2}px`;

    // Kirim variabel ke CSS
    p.style.setProperty("--start-x", `${startX}px`);
    p.style.setProperty("--start-y", `${startY}px`);

    gooeyFilter.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
}
