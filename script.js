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

// DATA MEMBER
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
    ],
  },
  {
    id: 2,
    name: "Dimas Visual",
    role: "Videographer",
    quote: "Gerakan lambat membuat segalanya lebih jujur.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500&auto=format&fit=crop",
    bio: "Eksperimentalis video yang menggunakan kamera analog dan digital.",
    portfolio: [
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=500&auto=format&fit=crop",
    ],
  },
  {
    id: 3,
    name: "Raka Art",
    role: "Graphic Designer",
    quote: "Chaos is just structure waiting to be found.",
    photo:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
    bio: "Membawa elemen jalanan ke dalam desain poster digital.",
    portfolio: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    ],
  },
];

// RENDER MEMBERS GRID
const peopleGrid = document.getElementById("people-grid");

// Render Member Cards
membersData.forEach((member, index) => {
  const card = document.createElement("div");
  card.className =
    "reveal-on-scroll group cursor-pointer relative flex flex-col items-center text-center";
  card.style.transitionDelay = `${index * 100}ms`;
  card.onclick = () => openDrawer(member.id);

  card.innerHTML = `
    <div class="mb-8 overflow-hidden relative aspect-[3/4] bg-neutral-100 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 w-full group">
        <img src="${member.photo}" 
             class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out opacity-90 group-hover:opacity-100" 
             alt="${member.name}">
        
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-6">
            <span class="text-white text-[9px] font-bold uppercase tracking-[0.4em] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                View Archive
            </span>
            <div class="w-8 h-[1px] bg-[#ed4099] mt-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
        </div>
    </div>

    <div class="space-y-2">
      <h4 class="text-xl font-light tracking-tight text-neutral-900 dark:text-white group-hover:text-[#ed4099] transition-colors duration-300">
        ${member.name}
      </h4>
      <p class="text-[9px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-[0.3em]">
        ${member.role}
      </p>
      <div class="pt-4 px-4">
        <p class="text-xs text-neutral-500 dark:text-neutral-400 italic leading-relaxed line-clamp-2 font-light">
          "${member.quote}"
        </p>
      </div>
    </div>
  `;
  peopleGrid.appendChild(card);
});

// RENDER JOIN CARD (Sophisticated Placeholder)
const joinCard = document.createElement("div");
joinCard.className =
  "reveal-on-scroll group border border-dashed border-neutral-300 dark:border-neutral-800 flex flex-col items-center justify-center p-10 text-center bg-neutral-50/50 dark:bg-neutral-900/20 hover:bg-white dark:hover:bg-[#0a0a0a] hover:border-[#ed4099] transition-all duration-500 cursor-pointer aspect-[3/4]";
joinCard.onclick = () =>
  document.getElementById("join").scrollIntoView({ behavior: "smooth" });

joinCard.innerHTML = `
    <div class="relative">
      <div class="w-14 h-14 border border-neutral-300 dark:border-neutral-700 rounded-full flex items-center justify-center mb-6 group-hover:border-[#ed4099] group-hover:bg-[#ed4099] transition-all duration-500">
        <svg class="w-5 h-5 text-neutral-400 dark:text-neutral-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 4v16m8-8H4"/>
        </svg>
      </div>
    </div>
    <h4 class="text-lg font-light tracking-tighter text-neutral-900 dark:text-white uppercase tracking-[0.1em]">Become Part of Us</h4>
    <p class="text-[10px] text-neutral-500 dark:text-neutral-500 mt-4 tracking-widest uppercase font-medium">Space Available</p>
    
    <div class="mt-6 w-0 h-px bg-[#ed4099] group-hover:w-12 transition-all duration-500"></div>
`;
peopleGrid.appendChild(joinCard);

// DRAWER LOGIC
function openDrawer(id) {
  const member = membersData.find((m) => m.id === id);
  if (!member) return;

  const drawerBody = document.getElementById("drawer-body");
  const drawer = document.getElementById("member-drawer");
  const content = document.getElementById("drawer-content");
  const overlay = document.getElementById("drawer-overlay");

  // Portfolio with Modern Grayscale to Color
  const portfolioHTML = member.portfolio
    .map(
      (img) => `
        <div class="relative bg-neutral-100 dark:bg-neutral-900 aspect-[4/5] overflow-hidden group border border-neutral-100 dark:border-neutral-800">
            <img src="${img}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700">
            <div class="absolute inset-0 border-[10px] border-white dark:border-[#0a0a0a] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
    `,
    )
    .join("");

  drawerBody.innerHTML = `
    <div class="flex flex-col h-full animate-fadeIn">
        <div class="space-y-8 mb-16">
            <div class="inline-block p-[2px] rounded-full bg-gradient-to-tr from-[#ed4099] to-blue-500">
              <img src="${member.photo}" class="w-32 h-32 object-cover rounded-full border-4 border-white dark:border-[#0a0a0a]">
            </div>
            
            <div>
                <span class="text-[10px] tracking-[0.5em] text-[#ed4099] font-bold uppercase mb-2 block">Collector of Realities</span>
                <h2 class="text-5xl font-light tracking-tighter dark:text-white mb-4 leading-none">${member.name}</h2>
                <div class="flex items-center gap-4 text-xs tracking-widest text-neutral-400 uppercase">
                  <span>${member.role}</span>
                  <span class="w-8 h-px bg-neutral-200 dark:bg-neutral-800"></span>
                  <span>Joined 2024</span>
                </div>
            </div>

            <p class="text-xl font-serif italic text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-lg">
              "${member.quote}"
            </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-10 border-y border-neutral-100 dark:border-neutral-900 mb-12">
            <div class="md:col-span-1">
              <h5 class="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-900 dark:text-white">Biography</h5>
            </div>
            <div class="md:col-span-2">
              <p class="text-sm text-neutral-500 dark:text-neutral-400 leading-[1.8] font-light italic">
                ${member.bio}
              </p>
            </div>
        </div>

        <div class="space-y-6">
            <div class="flex justify-between items-end mb-8">
              <h5 class="text-[10px] font-bold uppercase tracking-[0.3em] text-neutral-900 dark:text-white">Selected Works</h5>
              <span class="text-[9px] text-neutral-400 tracking-widest uppercase">${member.portfolio.length} Items</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                ${portfolioHTML}
            </div>
        </div>
        
        <div class="mt-20 text-center">
            <a href="#" class="inline-block w-full py-5 border border-neutral-200 dark:border-neutral-800 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-500">
              Request Full Portfolio
            </a>
        </div>
    </div>
  `;

  // Animation Trigger
  drawer.classList.remove("invisible");
  setTimeout(() => {
    content.classList.remove("translate-x-full");
    overlay.classList.add("opacity-100");
  }, 10);

  document.body.style.overflow = "hidden";
}

function closeDrawer() {
  const content = document.getElementById("drawer-content");
  const overlay = document.getElementById("drawer-overlay");
  const drawer = document.getElementById("member-drawer");

  content.classList.add("translate-x-full");
  overlay.classList.remove("opacity-100");

  setTimeout(() => {
    drawer.classList.add("invisible");
    document.body.style.overflow = "";
  }, 700);
}

// ANIMATION & INTERACTION LOGIC
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

// MEDIUM FILTER LOGIC
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
  color: "#ed4099",
  speed: "3s",
  thickness: 2,
});

// Gooey Navbar
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

// Send Message to Whatshapp
function sendToWhatsApp() {
  const name = document.getElementById("join-name").value;
  const medium = document.getElementById("join-medium").value;
  const message = document.getElementById("join-message").value;

  // Validasi sederhana
  if (!name || !message) {
    alert("Harap isi Nama dan Cerita kamu sebelum mengirim.");
    return;
  }

  const phoneNumber = "6287801051321"; // Format internasional (tanpa + atau 0 di depan)

  // Encode pesan untuk URL
  const text = `Halo Tamora Hunting Day!%0A%0ASaya ingin jadi Creative.%0A%0A*Nama:* ${name}%0A*Minat:* ${medium}%0A*Short Story:* ${message}`;

  const whatsappURL = `https://wa.me/${phoneNumber}?text=${text}`;

  // Buka jendela baru ke WhatsApp
  window.open(whatsappURL, "_blank");
}
