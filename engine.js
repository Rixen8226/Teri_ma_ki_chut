/* KING PATCHER SECURE GATEWAY */
(function(){
  document.addEventListener("DOMContentLoaded", () => {
    // FAQ Toggle
    document.querySelectorAll(".faq-q").forEach((q) => {
      q.addEventListener("click", function () {
        const item = this.parentElement;
        const isActive = item.classList.contains("active");
        document.querySelectorAll(".faq-item").forEach((el) => el.classList.remove("active"));
        if (!isActive) item.classList.add("active");
      });
    });

    const overlay = document.getElementById("drawerOverlay");
    const drawer = document.getElementById("purchaseDrawer");
    const dTitle = document.getElementById("dTitle");
    const dProduct = document.getElementById("dProduct");
    const dPrice = document.getElementById("dPrice");
    const dValidityValue = document.getElementById("dValidityValue");
    const dGameTypeValue = document.getElementById("dGameTypeValue");
    const vContainer = document.getElementById("validityTypes");
    const gContainer = document.getElementById("gameTypesContainer");

    let currentProduct = null, currentValidityIndex = 0, currentGameTypeIndex = 0, currentModeIndex = 0, productsList = [];

    async function loadProducts() {
      try {
        const res = await fetch("products.json");
        productsList = await res.json();
        renderProducts(productsList);
      } catch (e) {
        document.getElementById("productsContainer").innerHTML = '<div style="text-align:center;padding:20px;color:#f95959;font-size:14px;">Failed to load Premium Plans.</div>';
      }
    }
    loadProducts();

    window.renderProducts = function(list) {
      const container = document.getElementById("productsContainer");
      container.innerHTML = "";
      if (list.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:20px;color:#71717a;font-size:13px;">No tools found matching your search.</div>';
        return;
      }
      list.forEach((prod, index) => {
        const card = document.createElement("div");
        card.className = "prod-card";
        const isInitialLoad = document.getElementById('productSearch').value === "";
        if (isInitialLoad && index >= 5) card.classList.add("hidden-prod");
        card.onclick = () => openDrawer(prod.id);
        const badgeHtml = prod.badge ? `<span>${prod.badge}</span>` : "";
        const officialHtml = prod.official ? `<span style="background:rgba(0,200,83,.1);color:#00e676;font-size:9px;padding:2px 6px;border-radius:4px;text-transform:uppercase;font-weight:800;letter-spacing:.5px;margin-left:4px;">✓ OFFICIAL</span>` : "";
        let iconHtml = `<div class="prod-icon">${prod.icon}</div>`;
        if (prod.icon.includes(".") || prod.icon.includes("http")) {
          iconHtml = `<img src="${prod.icon}" class="prod-icon" style="object-fit:cover;padding:0;margin:0;width:56px;height:56px;">`;
        }
        card.innerHTML = `${iconHtml}<div class="prod-info"><div class="prod-title">${prod.name} ${badgeHtml}${officialHtml}</div><div class="prod-subtitle">${prod.description}</div><div class="prod-select">SELECT PLAN →</div></div>`;
        container.appendChild(card);
      });
      if (document.getElementById('productSearch').value === "" && list.length > 5) {
        const moreBtn = document.createElement("button");
        moreBtn.className = "more-btn";
        moreBtn.textContent = "VIEW ALL PRODUCTS";
        moreBtn.onclick = function() {
          document.querySelectorAll(".hidden-prod").forEach(c => c.classList.remove("hidden-prod"));
          this.style.display = "none";
        };
        container.appendChild(moreBtn);
      }
    };

    window.filterProducts = function() {
      const query = document.getElementById('productSearch').value.toLowerCase();
      const filtered = productsList.filter(p => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query) || (p.keywords && p.keywords.toLowerCase().includes(query)));
      renderProducts(filtered);
    };

    window.calculatePrice = function() {
      if (!currentProduct) return;
      let vPrice = currentProduct.validities?.[currentValidityIndex]?.price || 0;
      let gPrice = currentProduct.gameTypes?.[currentGameTypeIndex]?.price || 0;
      let mPrice = currentProduct.modes?.[currentModeIndex]?.price || 0;
      dPrice.textContent = `₹${Math.round(vPrice + gPrice + mPrice)}`;
    };

    window.openDrawer = function(productId) {
      currentProduct = productsList.find(p => p.id === productId);
      if (!currentProduct) return;
      dTitle.textContent = "Plan Details";
      dProduct.textContent = currentProduct.name;
      vContainer.innerHTML = "";
      currentValidityIndex = 0;
      if (currentProduct.validities?.length > 0) {
        currentProduct.validities.forEach((v, i) => {
          const el = document.createElement("div");
          el.className = `game-type ${i === 0 ? "active" : ""}`;
          el.textContent = v.name;
          el.onclick = () => setValidityType(i);
          vContainer.appendChild(el);
        });
        dValidityValue.textContent = currentProduct.validities[0].name;
        vContainer.parentElement.style.display = "block";
      } else {
        vContainer.parentElement.style.display = "none";
        dValidityValue.textContent = "Lifetime Access";
      }
      gContainer.innerHTML = "";
      currentGameTypeIndex = 0;
      if (currentProduct.gameTypes?.length > 0) {
        currentProduct.gameTypes.forEach((g, i) => {
          const el = document.createElement("div");
          el.className = `game-type ${i === 0 ? "active" : ""}`;
          el.textContent = g.name;
          el.onclick = () => setGameType(i);
          gContainer.appendChild(el);
        });
        dGameTypeValue.textContent = currentProduct.gameTypes[0].name;
        gContainer.parentElement.style.display = "block";
        dGameTypeValue.parentElement.style.display = "flex";
      } else {
        gContainer.parentElement.style.display = "none";
        dGameTypeValue.parentElement.style.display = "none";
      }
      const mContainer = document.getElementById("modeTypesContainer");
      mContainer.innerHTML = "";
      currentModeIndex = 0;
      if (currentProduct.modes?.length > 0) {
        currentProduct.modes.forEach((m, i) => {
          const el = document.createElement("div");
          el.className = `game-type ${i === 0 ? "active" : ""}`;
          el.textContent = m.name;
          el.onclick = () => setModeType(i);
          mContainer.appendChild(el);
        });
        document.getElementById("dModeValue").textContent = currentProduct.modes[0].name;
        document.getElementById("modeSelectWrap").style.display = "block";
        document.getElementById("dModeValue").parentElement.style.display = "flex";
      } else {
        document.getElementById("modeSelectWrap").style.display = "none";
        document.getElementById("dModeValue").parentElement.style.display = "none";
      }
      calculatePrice();
      overlay.classList.add("active");
      drawer.classList.add("active");
      document.body.classList.add("no-scroll");
    };

    window.closeDrawer = function() {
      overlay.classList.remove("active");
      drawer.classList.remove("active");
      document.body.classList.remove("no-scroll");
      drawer.style.transform = "";
    };

    window.setValidityType = function(idx) {
      currentValidityIndex = idx;
      dValidityValue.textContent = currentProduct.validities[idx].name;
      Array.from(vContainer.children).forEach((el, i) => el.classList.toggle("active", i === idx));
      calculatePrice();
    };

    window.setGameType = function(idx) {
      currentGameTypeIndex = idx;
      dGameTypeValue.textContent = currentProduct.gameTypes[idx].name;
      Array.from(gContainer.children).forEach((el, i) => el.classList.toggle("active", i === idx));
      calculatePrice();
    };

    window.setModeType = function(idx) {
      currentModeIndex = idx;
      document.getElementById("dModeValue").textContent = currentProduct.modes[idx].name;
      Array.from(document.getElementById("modeTypesContainer").children).forEach((el, i) => el.classList.toggle("active", i === idx));
      calculatePrice();
    };

    window.goToPayment = function() {
      if(!currentProduct) return;
      const v = dValidityValue.textContent, g = dGameTypeValue.textContent, m = document.getElementById("dModeValue").textContent, p = dPrice.textContent.replace("₹", "");
      window.location.href = `Payment.html?prod=${encodeURIComponent(currentProduct.name)}&v=${encodeURIComponent(v)}&g=${encodeURIComponent(g)}&m=${encodeURIComponent(m)}&p=${p}`;
    };

    let touchStartY = 0, isDragging = false;
    drawer.addEventListener("touchstart", e => { if (drawer.scrollTop === 0) { touchStartY = e.changedTouches[0].screenY; isDragging = true; drawer.style.transition = "none"; } }, { passive: true });
    drawer.addEventListener("touchmove", e => { if (!isDragging) return; const diff = e.changedTouches[0].screenY - touchStartY; if (diff > 0) { e.preventDefault(); drawer.style.transform = `translateX(-50%) translateY(${diff}px)`; } }, { passive: false });
    drawer.addEventListener("touchend", e => { if (!isDragging) return; isDragging = false; drawer.style.transition = "0.4s cubic-bezier(0.16,1,0.3,1)"; if (e.changedTouches[0].screenY - touchStartY > 100) closeDrawer(); else drawer.style.transform = "translateX(-50%) translateY(0)"; }, { passive: true });
  });
})();
