document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenuWrapper = document.getElementById('nav-menu-wrapper');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    // فتح وإغلاق قائمة الموبايل الرئيسية (Hamburger Menu)
    mobileMenuBtn.addEventListener('click', () => {
        navMenuWrapper.classList.toggle('active');
        
        // تغيير شكل الأيقونة من Bars إلى X عند الفتح
        const icon = mobileMenuBtn.querySelector('i');
        if (navMenuWrapper.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // التحكم في الـ Dropdowns داخل شاشات الموبايل عند الضغط
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            // نطبق التعديل فقط إذا كنا على شاشة أصغر من 992 بكسل
            if (window.innerWidth < 992) {
                e.preventDefault(); // منع الانتقال الفوري للرابط
                const parentLi = toggle.parentElement;
                
                // إغلاق أي قائمة أخرى مفتوحة
                dropdownToggles.forEach(otherToggle => {
                    const otherParent = otherToggle.parentElement;
                    if (otherParent !== parentLi) {
                        otherParent.classList.remove('open');
                    }
                });

                // فتح أو غلق القائمة الحالية
                parentLi.classList.toggle('open');
            }
        });
    });
});

















document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content-item');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 1. إزالة كلاس active من جميع الأزرار وتفعيله للزر المكبوس فقط
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // 2. الحصول على الـ id الخاص بالمحتوى المستهدف
            const targetId = button.getAttribute('data-target');

            // 3. إخفاء جميع محتويات الكروت وإظهار المستهدف بالملّي
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === targetId) {
                    content.classList.add('active');
                }
            });
        });
    });
});














document.addEventListener('DOMContentLoaded', () => {
    const overlayCard = document.getElementById('active-overlay-card');
    const tabs = document.querySelectorAll('.design-tab-btn');
    const bullets = document.querySelectorAll('.design-bullets .bullet');
    
    // جلب الكروت بترتيبها الحالي في الـ HTML وتحويلها لمصفوفة متحركة
    let cards = Array.from(document.querySelectorAll('.carousel-card'));
    
    // الترتيب الافتراضي للكلاسات بناءً على الـ 5 كروت المتاحة
    // الكارت الثالث (index 2) هو الـ Car Wash وهيبدأ كـ Active في البداية
    const positions = ['pos-1', 'pos-2', 'pos-active', 'pos-4', 'pos-5'];

    // دالة تحديث الكلاسات على الكروت لتنفيذ تأثير "الزق والتحريك المتسلسل"
    function updateCarousel() {
        cards.forEach((card, index) => {
            // إزالة كافة كلاسات التموضع القديمة
            card.classList.remove('pos-1', 'pos-2', 'pos-active', 'pos-4', 'pos-5');
            // تعيين الكلاس الجديد بناءً على مكانه الحالي في المصفوفة
            card.classList.add(positions[index]);

            // إذا كان هذا الكارت هو النشط (pos-active)، نقوم بنسخ صورته لتعرض داخل الموبايل فوراُ
            if (positions[index] === 'pos-active') {
                overlayCard.src = card.src;
                
                // تحديث الـ Tab والـ Bullet المتوافقين معه
                const targetName = card.getAttribute('data-card');
                updateTabsAndBullets(targetName);
            }
        });
    }

    // دالة لتحريك السلسلة يميناً أو يساراً حتى يصبح الكارت المطلوب في المنتصف
    function rotateToCard(targetCard) {
        let activeIndex = cards.indexOf(targetCard);
        
        // التحرك المتتالي خطوة بخطوة حتى يصل الكارت المختار للمركز (index 2)
        while (activeIndex !== 2) {
            if (activeIndex < 2) {
                // الكارت على اليسار: نزق السلسلة كاملة لليمين
                const last = cards.pop();
                cards.unshift(last);
            } else {
                // الكارت على اليمين: نزق السلسلة كاملة للشمال
                const first = cards.shift();
                cards.push(first);
            }
            activeIndex = cards.indexOf(targetCard);
        }
        // تشغيل الأنيميشن والحركة بعد إعادة ترتيب المصفوفة
        updateCarousel();
    }

    // ربط الضغط المباشر على الكروت الجانبية
    cards.forEach(card => {
        card.addEventListener('click', () => {
            rotateToCard(card);
        });
    });

    // ربط الضغط على أزرار الـ Tabs العلوية
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-target');
            const targetCard = cards.find(c => c.getAttribute('data-card') === target);
            if (targetCard) {
                rotateToCard(targetCard);
            }
        });
    });

    // دالة مساعدة لتزامن الأزرار والـ Bullets مع الكارت المعروض حالياً
    function updateTabsAndBullets(targetName) {
        tabs.forEach((tab, idx) => {
            if (tab.getAttribute('data-target') === targetName) {
                tabs.forEach(t => t.classList.remove('active'));
                bullets.forEach(b => b.classList.remove('active'));
                
                tab.classList.add('active');
                if (bullets[idx]) bullets[idx].classList.add('active');
            }
        });
    }

    // تشغيل الكاروسيل لأول مرة عند تحميل الصفحة لضبط المشهد
    updateCarousel();
});




















document.addEventListener("DOMContentLoaded", function () {
    
    // المكونات وعناصر الفاتورة المباشرة
    const managerCountEl = document.getElementById("manager-count");
    const templatesCountEl = document.getElementById("templates-count");
    const notificationToggle = document.getElementById("notification-toggle");
    const designToggle = document.getElementById("design-toggle");
    
    const totalPriceValueEl = document.getElementById("total-price-value");
    const invoiceItemsList = document.getElementById("invoice-items-list");

    // دالة لتنسيق الأرقام وإضافة الصفر على اليسار لو الرقم أقل من 10 (مثال: 02, 03)
    function formatNumber(num) {
        return num < 10 ? '0' + num : num;
    }

    // الدالة السحرية لإعادة الحساب الكلي وبناء تفاصيل الفاتورة
    function calculatePlanTotal() {
        let total = 0;
        let breakdownHTML = "";

        // 1. حساب قيمة الـ Manager Slots
        let managerCount = parseInt(managerCountEl.textContent, 10);
        let managerPrice = managerCount * 5; // السعر المحدد 5 ريال لكل جهاز/حساب
        if (managerCount > 0) {
            total += managerPrice;
            breakdownHTML += `
                <div class="invoice-item">
                    <span>Manager Slots</span>
                    <span class="item-price">${managerPrice} SAR</span>
                </div>`;
        }

        // 2. حساب قيمة الـ Card Templates
        let templatesCount = parseInt(templatesCountEl.textContent, 10);
        let templatesPrice = templatesCount * 10; // السعر المحدد 10 ريال لكل قالب استامب
        if (templatesCount > 0) {
            total += templatesPrice;
            breakdownHTML += `
                <div class="invoice-item">
                    <span>Card Templates</span>
                    <span class="item-price">${templatesPrice} SAR</span>
                </div>`;
        }

        // 3. حساب قيمة الـ Notification Scheduler (لو المفتاح نشط)
        if (notificationToggle.checked) {
            total += 8; // السعر المبين في الفاتورة بالتصميم 20 ريال
            breakdownHTML += `
                <div class="invoice-item">
                    <span>Notification Scheduler</span>
                    <span class="item-price">20 SAR</span>
                </div>`;
        }

        // 4. حساب قيمة الـ Professional Card Design (لو المفتاح نشط)
        if (designToggle.checked) {
            total += 0; // السعر المحدد في خيارات الداتا 25 ريال
            breakdownHTML += `
                <div class="invoice-item">
                    <span>Professional Card Design</span>
                    <span class="item-price">25 SAR</span>
                </div>`;
        }

        // تحديث الرقم النهائي الواضح في واجهة المستخدم للفاتورة الكلية
        totalPriceValueEl.textContent = total;
        
        // تحديث قائمة بنود الفاتورة ديناميكياً
        invoiceItemsList.innerHTML = breakdownHTML;
    }

    // إعداد وتشغيل مستمعي الأحداث لكروت العدادات الرقمية (+ و -)
    const counterCards = document.querySelectorAll('.control-card[data-type="counter"]');
    
    counterCards.forEach(card => {
        const btnMinus = card.querySelector('.btn-minus');
        const btnPlus = card.querySelector('.btn-plus');
        const valueSpan = card.querySelector('.counter-value');

        // عند الضغط على زر زائد (+)
        btnPlus.addEventListener('click', function () {
            let currentVal = parseInt(valueSpan.textContent, 10);
            currentVal++;
            valueSpan.textContent = formatNumber(currentVal);
            calculatePlanTotal(); // إعادة الحساب الفوري
        });

        // عند الضغط على زر ناقص (—)
        btnMinus.addEventListener('click', function () {
            let currentVal = parseInt(valueSpan.textContent, 10);
            if (currentVal > 0) { // منع النزول تحت الصفر
                currentVal--;
                valueSpan.textContent = formatNumber(currentVal);
                calculatePlanTotal(); // إعادة الحساب الفوري
            }
        });
    });

    // إعداد وتشغيل مستمعي الأحداث لمفاتيح الـ Toggle Switches
    notificationToggle.addEventListener('change', calculatePlanTotal);
    designToggle.addEventListener('change', calculatePlanTotal);

    // تشغيل الحسبة لأول مرة عند تحميل الصفحة لتظهر الأرقام الافتراضية للتصميم (80 SAR) مباشرة!
    calculatePlanTotal();
});





























































document.querySelectorAll('.step-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // إزالة كلاس active من الكارت النشط السابق
        document.querySelector('.step-card.active')?.classList.remove('active');
        // إضافة كلاس active للكارت الحالي الذي يقف عليه الماوس ليظل مفتوحاً
        card.classList.add('active');
    });
});

























// إدارة كروت الـ POS لتثبيت حالة آخر كارت تم الوقوف عليه
document.querySelectorAll('.pos-logos-grid .pos-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        // البحث عن الكارت النشط حالياً وإزالة كلاس الـ active منه
        const currentActive = document.querySelector('.pos-logos-grid .pos-card.active');
        if (currentActive) {
            currentActive.classList.remove('active');
        }
        // إضافة كلاس الـ active للكارت الجديد ليظل مفتوحاً ومحفوظ الحالة
        card.classList.add('active');
    });
});











document.querySelectorAll('.testimonial-card').forEach(card => {
    
    // عند تحرك الماوس داخل الكارت يتم حساب زوايا الالتفاف الديناميكية
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        
        // حساب نقطة المنتصف للكارت (X و Y)
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        
        // حساب مسافة الماوس عن مركز الكارت
        const mouseX = e.clientX - cardCenterX;
        const mouseY = e.clientY - cardCenterY;
        
        // تحويل المسافات لدرجات ميلان (قسمة العوامل للتحكم بمدى قوة ومرونة التأرجح)
        // القيمة الموصى بها للميلان الهادئ الأنيق هي ما بين 10 إلى 15 درجة كحد أقصى
        const rotateX = -(mouseY / (cardRect.height / 2)) * 22;
        const rotateY = (mouseX / (cardRect.width / 2)) * 22;
        
        // تطبيق الحركة وميزة التكبير البسيطة (Scale) بالتوازي
        card.style.transform = `scale(1.03) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    // عند خروج الماوس تماماً يعود الكارت إلى حالته وموضعه الأصلي المستقر بنعومة
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
    });
});























// 4. تأثير ظهور العناصر عند السكرول (Reveal on Scroll)

const reveals = document.querySelectorAll(".reveal");

const revealOnScroll = () => {

reveals.forEach(el => {

const windowHeight = window.innerHeight;

const elementTop = el.getBoundingClientRect().top;

const elementVisible = 150;

if (elementTop < windowHeight - elementVisible) {

el.classList.add("active");

}

});

};

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();



// 5. الـ Marquee

const marqueeTrack = document.querySelector('.marquee-track');

if (marqueeTrack) {

const content = marqueeTrack.innerHTML;

marqueeTrack.innerHTML += content;

let scrollX = 0;

const animate = () => {

scrollX -= 0.5;

if (Math.abs(scrollX) >= marqueeTrack.scrollWidth / 2) scrollX = 0;

marqueeTrack.style.transform = `translateX(${scrollX}px)`;

requestAnimationFrame(animate);

};

animate();

}



document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById("darkToggle");
    const toggleIcon = document.getElementById("toggleIcon");

    const themeImages = [
        { id: "toggleIcon", light: "img/dark_mode.png", dark: "img/light_mode.png" },
        // أضف باقي الصور هنا كما كنت تفعل
    ];

    function updateImages(isDark) {
        themeImages.forEach(item => {
            const el = document.getElementById(item.id);
            if (el) {
                if (el.tagName === 'VIDEO') {
                    const source = el.querySelector('source');
                    if (source) source.src = isDark ? item.dark : item.light;
                    el.load();
                } else {
                    el.src = isDark ? item.dark : item.light;
                }
            }
        });
    }

    // استرجاع الحالة
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";

    if (isDark) {
        document.body.classList.add("dark-mode");
    }
    
    // التحديث الأول
    updateImages(isDark);

    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            const nowDark = document.body.classList.contains("dark-mode");
            
            updateImages(nowDark);
            localStorage.setItem("theme", nowDark ? "dark" : "light");
        });
    } else {
        console.error("لم يتم العثور على زر darkToggle!");
    }
});














document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".bt");

    const observerOptions = {
        root: null, // يراقب داخل الـ viewport (الشاشة)
        threshold: .7    // عندما يظهر 50% من العنصر (منتصف الشاشة)
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // إذا دخل العنصر للمنتصف، أضف الكلاس
                entry.target.classList.add("is-visible");
            } else {
                // اختياري: إذا خرج العنصر، يعود لـ 0.4
                entry.target.classList.remove("is-visible");
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });
});


