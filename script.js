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









































document.addEventListener('DOMContentLoaded', () => {
    const mainActiveCard = document.getElementById('main-active-card');
    let cards = Array.from(document.querySelectorAll('.card-item'));
    
    // المواقع الخمسة
    const positions = ['pos-a', 'pos-b', 'pos-c', 'pos-d', 'pos-e'];

    function updateView() {
        cards.forEach((card, index) => {
            // إزالة الكلاسات القديمة
            card.classList.remove(...positions);
            // إضافة الكلاس الجديد
            card.classList.add(positions[index]);

            // تحديث صورة الهاتف للكرت الموجود في المركز (index 2)
            if (index === 2) {
                mainActiveCard.src = card.src;
            }
        });
    }

    function moveCarousel(targetCard) {
        let activeIndex = cards.indexOf(targetCard);
        
        // تدوير المصفوفة حتى يصبح الكرت في المركز
        while (activeIndex !== 2) {
            if (activeIndex < 2) {
                const last = cards.pop();
                cards.unshift(last);
            } else {
                const first = cards.shift();
                cards.push(first);
            }
            activeIndex = cards.indexOf(targetCard);
        }
        updateView();
    }

    cards.forEach(card => {
        card.addEventListener('click', () => {
            moveCarousel(card);
        });
    });

    // تشغيل عند التحميل
    updateView();
});


















  const translations = {
        'en': {
            'products': 'Products',
            'loyalty': 'Loyalty Cards',
            'rewards': 'Rewards System',
            'notifications': 'Smart Notifications',
            'analytics': 'Analytics Dashboard',
            'features': 'Features',
            'pricing': 'Pricing',
            'lang': 'English',
            'login': 'LOG IN',
            'contact': 'CONTACT US',

            'hero_title': 'A Smarter Way To Keep ',
            'hero_title_span': 'Customers Coming Back',
            'hero_subtitle': 'Launch digital loyalty cards, rewards, and automated notifications in minutes.',
            'contact_us': 'CONTACT US',
            'try_demo': 'TRY A DEMO',

            'trusted_by': 'Trusted by',
            'trust_count': '+100 businesses',

            'card_type_title': 'Card ',
            'card_type_title_span': 'Type',
            'card_type_subtitle': 'Choose the loyalty mechanism that fits your business, from simple coffee shops to sophisticated cashback ecosystem.',

            'tab_stamps': 'Stamps',
            'tab_cashback': 'CashBack',
            'tab_discount': 'Discount',
            'tab_prepaid': 'Prepaid',
            'tab_points': 'Points',
            'tab_subscription': 'Subscription',
            'tab_membership': 'Membership',

            'stamp_title': 'Stamp Card',
            'stamp_desc': 'Reward your customers for repeat visits. Collect stamps on each purchase and unlock rewards easily.',

            'cashback_title': 'Cashback Card',
            'cashback_desc': 'Give back a percentage of every purchase. Encourage customers to return and spend more accumulated balance.',

            'discount_title': 'Discount Card',
            'discount_desc': 'Offer tiered discounts to loyalty tiers. Driving sales and effective for boosting conversions.',

            'prepaid_title': 'Prepaid Card',
            'prepaid_desc': 'Let customers pay in advance and spend later. It creates a seamless experience for faster checkouts.',

            'points_title': 'Point Card',
            'points_desc': 'Earn points with every purchase and redeem rewards. Build long-term engagement with flexible incentives.',

            'subscription_title': 'Subscription Card',
            'subscription_desc': 'Offer exclusive access with recurring plans. Create predictable revenue and loyal members.',

            'membership_title': 'Membership Card',
            'membership_desc': 'Offer exclusive access with recurring plans. Create predictable revenue and loyal members.',

            'design_card_title': 'Design Your ',
            'design_card_title_span': 'Card',
            'design_card_subtitle': 'Choose the right card design for your business and offer a professional loyalty experience to your customers.',

            'design_tab_carwash': 'Car Wash',
            'design_tab_coffee': 'Coffee Shop',
            'design_tab_restaurants': 'Restaurants',
            'design_tab_clinics': 'Clinics',
            'design_tab_massage': 'Massage Center',

            'how_works_title': 'How It Works for ',
            'how_works_title_span': 'Your Customers',
            'how_works_subtitle': 'A seamless experience your customers will love, no apps, no hassle, just rewards.',

            'step1_title': 'First Step',
            'step1_desc': 'Open the camera app or scanner to capture the custom merchant code instantly.',
            'step2_title': 'Secound Step',
            'step2_desc': 'Their Boukak card appears instantly on their phone, no app needed.',
            'step3_title': 'Third Step',
            'step3_desc': 'Scan the digital loyalty card at the point of sale to add stamps seamlessly.',
            'step4_title': 'Fourth Step',
            'step4_desc': 'Unlock exclusive rewards and watch your loyal customers keep coming back.',

            'step_badge1': 'No app download required',
            'step_badge2': 'Works instantly on any phone',

            'dashboard_title': 'All Your ',
            'dashboard_title_span': 'Loyalty Data',
            'dashboard_title_sub': 'in One Dashboard',
            'dashboard_desc': 'Track your loyalty program performance in real time.<br>Get clear insights into customer behavior, retention, and revenue, all from one powerful dashboard.',

            'dash_badge1': 'Track customer visits',
            'dash_badge2': 'Monitor revenue',
            'dash_badge3': 'Real-time insights',
            'dash_badge4': 'Export reports',

            'features_section_title': 'Smart System for ',
            'features_section_title_span': 'Customer Loyalty',
            'features_section_subtitle': 'Track visits, manage rewards, send smart notifications, and build stronger customer relationships, all from one platform.',

            'feat1_title': 'Live Analytics',
            'feat1_desc': 'Track visits, engagement, and loyalty performance in real time.',
            'feat2_title': 'Customer Management',
            'feat2_desc': 'Monitor customer activity, visits, and loyalty status in one place.',
            'feat3_title': 'Rewards & Stamps',
            'feat3_desc': 'Issue digital stamps and rewards with a seamless experience.',
            'feat4_title': 'Smart Notifications',
            'feat4_desc': 'Send automated offers and reminders at the perfect time.',

            'reach_title': 'How To Reach <br> Your ',
            'reach_title_span': 'Customers',
            'reach_subtitle': 'Automate customer engagement with smart notifications, location targeting, and personalized messaging.',

            'reach1_title': 'Send Notification',
            'reach1_desc': 'Send real-time notifications to your customers instantly. Keep them updated with offers, reminders, and important updates right when it matters most.',
            'reach2_title': 'Notifications Automation',
            'reach2_desc': 'Automate your customer engagement with smart triggers. Send personalized messages based on customer behavior, visits, or milestones without manual effort.',
            'reach3_title': 'Location Notifications',
            'reach3_desc': 'Reach your customers at the right place and time. Send targeted notifications based on their location to increase visits and drive more in-store engagement.',

            'wallets_title': 'We support ',
            'wallets_title_span': 'Apple & Google Wallets',

            'testimonials_title': 'What Our Valuable <br>',
            'testimonials_title_span': 'Customer',

            't1_role': 'Wash Center',
            't1_text': '"Since we started using Boukak, customer engagement has completely changed for us. The automated notifications and loyalty features helped us bring customers back more often and create a smoother experience overall."',
            't2_role': 'Gas Company',
            't2_text': '"Boukak made it much easier to manage our customer loyalty program. We can now track visits, monitor engagement, and send targeted offers in a very organized and professional way."',
            't3_role': 'Coffee shop',
            't3_text': '"We wanted a simple but smart loyalty system, and Boukak delivered exactly that. Customers interact more with our offers now, and the entire rewards experience feels seamless."',
            't4_role': 'Nail Spa',
            't4_text': '"One of the best things about Boukak is how easy it is to use. Managing customer rewards, visits, and engagement became much more organized, and we noticed customers returning more."',
            't5_role': 'Mobile Shop',
            't5_text': '"Boukak helped us create a more modern customer experience inside our store. The smart notifications and loyalty system made it easier to keep customers connected with our business."',
            't6_role': 'Salon & Spa',
            't6_text': '"Everything feels more professional with Boukak. From customer tracking to rewards and analytics, the system gave us better control over customer relationships and helped improve retention."',

            'pos_title': 'Seamless ',
            'pos_title_span': 'POS',
            'pos_subtitle': 'Connect your favorite Point of Sale system to automatically sync customer data and reward transactions in real-time. No manual entry, no friction.',

            'pos1_desc': 'Powerful payment processing and customer management for retailers.',
            'pos2_desc': 'Full-stack retail management with robust inventory and rewards.',
            'pos3_desc': 'The leading all-in-one POS built specifically for restaurants.',
            'pos_footer_text': 'Do you have an unregistered point of sale system?',

            'plan_title': 'Build Your Own <br>',
            'plan_title_span': 'Loyalty',
            'plan_subtitle': 'Customize your subscription by selecting the features that fit your business needs. Pay only what you use.',

            'core_title': 'By Default Core Feature',
            'core_badge1': 'Unlimited digital cards',
            'core_badge2': 'Unlimited notification messages',
            'core_badge3': 'Welcome feature on site',
            'core_badge4': 'Scanner / Free Manager App',

            'calc1_title': 'Manager Slots',
            'calc1_desc': 'SAR 5/slot. Empower your team.',
            'calc2_title': 'Card Templates',
            'calc2_desc': 'SAR 10/mo. 50+ stamp design.',
            'calc3_title': 'Notification Scheduler',
            'calc3_desc': 'SAR 8/mo Automate customer engagement.',
            'calc4_title': 'Professional Card Design',
            'calc4_desc': 'SAR 25/mo Physical posters shipped to store',

            'invoice_title': 'Selected Plan Total',
            'period_annual': '/annual',
            'support_note': 'Include 24/7 priority support and all future core platform update. Cancel or change your plan at any time.',
            'subscribe_now': 'Subscribe Now',

            'footer_cta_title': 'Launch Your <br>',
            'footer_cta_title_span': 'Loyalty Program',
            'footer_trial': 'Start your 14-day free trial',

            'privacy_policy': 'Privacy Policy',
            'terms_conditions': 'Terms & Conditions',
            'contact_support': 'Contact Support',
            'footer_copyright': '© Copyright 2026. All Right Reserved'
        },
        'ar': {
            'products': 'المنتجات',
            'loyalty': 'بطاقات الولاء',
            'rewards': 'نظام المكافآت',
            'notifications': 'تنبيهات ذكية',
            'analytics': 'لوحة التحليلات',
            'features': 'المميزات',
            'pricing': 'الأسعار',
            'lang': 'عربي',
            'login': 'تسجيل الدخول',
            'contact': 'اتصل بنا',

            'hero_title': 'خلّي عملاءك',
            'hero_title_span': 'يرجعون لك باستمرار',
            'hero_subtitle': 'أطلق بطاقات ولاء رقمية، مكافآت، وإشعارات ذكية لزيادة تفاعل العملاء ورفع الزيارات المتكررة بسهولة.',
            'contact_us': 'اتصل بنا',
            'try_demo': 'ابدأ التجربة',

            'trusted_by': 'موثوق لدى أكثر',
            'trust_count': 'من 100 نشاط تجاري',

            'card_type_title': 'أنواع ',
            'card_type_title_span': 'البطاقات',
            'card_type_subtitle': 'اختر نظام الولاء الذي يناسب نشاطك التجاري، من المقاهي البسيطة إلى أنظمة الكاش باك المتقدمة.',

            'tab_stamps': 'الأختام',
            'tab_cashback': 'كاش باك',
            'tab_discount': 'الخصومات',
            'tab_prepaid': 'مسبقة الدفع',
            'tab_points': 'النقاط',
            'tab_subscription': 'الاشتراكات',
            'tab_membership': 'العضويات',

            'stamp_title': 'بطاقة الأختام',
            'stamp_desc': 'كافئ عملاءك على زياراتهم المتكررة. اجمع الأختام مع كل عملية شراء وافتح المكافآت بسهولة.',

            'cashback_title': 'بطاقة الكاش باك',
            'cashback_desc': 'أعد نسبة من كل عملية شراء لعملائك. شجّعهم على العودة وإنفاق رصيدهم المتراكم.',

            'discount_title': 'بطاقة الخصومات',
            'discount_desc': 'قدّم خصومات متدرجة حسب فئات الولاء. وسيلة فعّالة لزيادة المبيعات وتحسين معدلات التحويل.',

            'prepaid_title': 'بطاقة مسبقة الدفع',
            'prepaid_desc': 'مكّن عملاءك من الدفع مسبقاً والإنفاق لاحقاً، لتجربة دفع أسرع وأكثر سلاسة.',

            'points_title': 'بطاقة النقاط',
            'points_desc': 'اكسب نقاطاً مع كل عملية شراء واستبدلها بمكافآت. عزّز ولاء عملائك على المدى الطويل بحوافز مرنة.',

            'subscription_title': 'بطاقة الاشتراك',
            'subscription_desc': 'قدّم وصولاً حصرياً عبر خطط متكررة. حقّق دخلاً ثابتاً وعملاء أكثر ولاءً.',

            'membership_title': 'بطاقة العضوية',
            'membership_desc': 'قدّم وصولاً حصرياً عبر خطط متكررة. حقّق دخلاً ثابتاً وعملاء أكثر ولاءً.',

            'design_card_title': 'صمم ',
            'design_card_title_span': 'بطاقتك',
            'design_card_subtitle': 'اختر تصميم البطاقة المناسب لنشاطك التجاري وقدّم لعملائك تجربة ولاء بمظهر مهني.',

            'design_tab_carwash': 'مغسلة سيارات',
            'design_tab_coffee': 'مقهى',
            'design_tab_restaurants': 'مطاعم',
            'design_tab_clinics': 'عيادات',
            'design_tab_massage': 'مركز تدليك',

            'how_works_title': 'كيف تعمل المنصة لـ ',
            'how_works_title_span': 'عملائك',
            'how_works_subtitle': 'تجربة سلسة سيحبها عملاؤك، بلا تطبيقات وبلا تعقيد، فقط مكافآت.',

            'step1_title': 'الخطوة الأولى',
            'step1_desc': 'افتح تطبيق الكاميرا أو الماسح لمسح كود المتجر الخاص فوراً.',
            'step2_title': 'الخطوة الثانية',
            'step2_desc': 'تظهر بطاقة بوكاك مباشرة على هاتف العميل دون الحاجة لأي تطبيق.',
            'step3_title': 'الخطوة الثالثة',
            'step3_desc': 'قم بمسح بطاقة الولاء الرقمية عند نقطة البيع لإضافة الأختام بسهولة.',
            'step4_title': 'الخطوة الرابعة',
            'step4_desc': 'افتح مكافآت حصرية وشاهد عملاءك يعودون مراراً وتكراراً.',

            'step_badge1': 'بدون الحاجة لتحميل أي تطبيق',
            'step_badge2': 'يعمل فوراً على أي هاتف',

            'dashboard_title': 'كل بيانات ',
            'dashboard_title_span': 'الولاء',
            'dashboard_title_sub': 'في لوحة تحكم واحدة',
            'dashboard_desc': 'تابع أداء برنامج الولاء الخاص بك في الوقت الفعلي.<br>احصل على رؤى واضحة حول سلوك العملاء، والاحتفاظ بهم، والإيرادات، كل ذلك من لوحة تحكم واحدة قوية.',

            'dash_badge1': 'تتبع زيارات العملاء',
            'dash_badge2': 'متابعة الإيرادات',
            'dash_badge3': 'رؤى لحظية',
            'dash_badge4': 'تصدير التقارير',

            'features_section_title': 'نظام ذكي لـ ',
            'features_section_title_span': 'ولاء العملاء',
            'features_section_subtitle': 'تتبع الزيارات، أدر المكافآت، أرسل تنبيهات ذكية، وبني علاقات أقوى مع عملائك، كل ذلك من منصة واحدة.',

            'feat1_title': 'تحليلات لحظية',
            'feat1_desc': 'تابع الزيارات والتفاعل وأداء برنامج الولاء في الوقت الفعلي.',
            'feat2_title': 'إدارة العملاء',
            'feat2_desc': 'راقب نشاط عملائك وزياراتهم وحالة ولائهم من مكان واحد.',
            'feat3_title': 'المكافآت والأختام',
            'feat3_desc': 'أصدر أختاماً ومكافآت رقمية بتجربة سلسة.',
            'feat4_title': 'تنبيهات ذكية',
            'feat4_desc': 'أرسل عروضاً وتذكيرات تلقائية في الوقت المناسب.',

            'reach_title': 'كيف تتواصل مع <br>',
            'reach_title_span': 'عملائك',
            'reach_subtitle': 'أتمتة تفاعل العملاء عبر التنبيهات الذكية، والاستهداف بالموقع، والرسائل الشخصية.',

            'reach1_title': 'إرسال التنبيهات',
            'reach1_desc': 'أرسل تنبيهات فورية لعملائك في اللحظة المناسبة. أبقهم على اطلاع بالعروض والتذكيرات والتحديثات المهمة.',
            'reach2_title': 'أتمتة التنبيهات',
            'reach2_desc': 'أتمت تفاعل عملائك بمحفزات ذكية. أرسل رسائل مخصصة حسب سلوك العميل وزياراته أو إنجازاته دون أي جهد يدوي.',
            'reach3_title': 'تنبيهات الموقع',
            'reach3_desc': 'تواصل مع عملائك في المكان والزمان المناسبين. أرسل تنبيهات مستهدفة بناءً على موقعهم لزيادة الزيارات والتفاعل داخل المتجر.',

            'wallets_title': 'ندعم محافظ ',
            'wallets_title_span': 'آبل وجوجل',

            'testimonials_title': 'ماذا يقول <br>',
            'testimonials_title_span': 'عملاؤنا',

            't1_role': 'مركز غسيل سيارات',
            't1_text': '"منذ بدأنا استخدام بوكاك، تغير تفاعل عملائنا بشكل كامل. ساعدتنا التنبيهات التلقائية ومميزات الولاء على إعادة العملاء بشكل أكبر وخلق تجربة أكثر سلاسة بشكل عام."',
            't2_role': 'شركة وقود',
            't2_text': '"سهّل بوكاك علينا إدارة برنامج ولاء العملاء بشكل كبير. أصبحنا نستطيع تتبع الزيارات ومتابعة التفاعل وإرسال عروض مستهدفة بطريقة منظمة ومهنية."',
            't3_role': 'مقهى',
            't3_text': '"كنا نريد نظام ولاء بسيط وذكي، وقدم بوكاك ذلك بالضبط. أصبح العملاء يتفاعلون أكثر مع عروضنا، وتجربة المكافآت بأكملها أصبحت سلسة."',
            't4_role': 'صالون تجميل',
            't4_text': '"من أفضل ما يميز بوكاك سهولة استخدامه. أصبحت إدارة مكافآت العملاء وزياراتهم وتفاعلهم أكثر تنظيماً، ولاحظنا زيادة في عودة العملاء."',
            't5_role': 'متجر هواتف',
            't5_text': '"ساعدنا بوكاك على خلق تجربة أكثر حداثة لعملائنا داخل المتجر. سهّلت التنبيهات الذكية ونظام الولاء التواصل مع عملائنا بشكل أفضل."',
            't6_role': 'صالون وسبا',
            't6_text': '"كل شيء أصبح أكثر مهنية مع بوكاك. من تتبع العملاء إلى المكافآت والتحليلات، أعطانا النظام تحكماً أفضل في علاقاتنا مع العملاء وساعد على تحسين الاحتفاظ بهم."',

            'pos_title': 'تكامل سلس مع ',
            'pos_title_span': 'أنظمة نقاط البيع',
            'pos_subtitle': 'اربط نظام نقاط البيع المفضل لديك لمزامنة بيانات العملاء ومعاملات المكافآت تلقائياً وفي الوقت الفعلي، بدون إدخال يدوي وبدون تعقيد.',

            'pos1_desc': 'معالجة دفع قوية وإدارة عملاء فعّالة لتجار التجزئة.',
            'pos2_desc': 'إدارة تجزئة متكاملة بمخزون قوي ونظام مكافآت.',
            'pos3_desc': 'نظام نقاط البيع الرائد والمتكامل المصمم خصيصاً للمطاعم.',
            'pos_footer_text': 'هل تملك نظام نقاط بيع غير مسجل لدينا؟',

            'plan_title': 'صمم خطة <br>',
            'plan_title_span': 'الولاء',
            'plan_subtitle': 'خصص اشتراكك عن طريق اختيار المميزات التي تناسب احتياجات نشاطك التجاري. ادفع فقط مقابل ما تستخدمه.',

            'core_title': 'المميزات الأساسية المتضمنة افتراضياً',
            'core_badge1': 'بطاقات رقمية غير محدودة',
            'core_badge2': 'رسائل تنبيهات غير محدودة',
            'core_badge3': 'صفحة ترحيب على الموقع',
            'core_badge4': 'ماسح / تطبيق مدير مجاني',

            'calc1_title': 'مقاعد المدراء',
            'calc1_desc': '5 ريال للمقعد. عزّز فريقك.',
            'calc2_title': 'قوالب البطاقات',
            'calc2_desc': '10 ريال شهرياً. أكثر من 50 تصميم ختم.',
            'calc3_title': 'مجدول التنبيهات',
            'calc3_desc': '8 ريال شهرياً، أتمتة تفاعل العملاء.',
            'calc4_title': 'تصميم بطاقة احترافي',
            'calc4_desc': '25 ريال شهرياً، ملصقات فعلية تُشحن إلى متجرك',

            'invoice_title': 'إجمالي الخطة المختارة',
            'period_annual': '/سنوياً',
            'support_note': 'يشمل دعماً ذو أولوية على مدار الساعة وكل التحديثات المستقبلية للمنصة. يمكنك إلغاء أو تغيير خطتك في أي وقت.',
            'subscribe_now': 'اشترك الآن',

            'footer_cta_title': 'ابدأ برنامج <br>',
            'footer_cta_title_span': 'الولاء الخاص بك',
            'footer_trial': 'ابدأ تجربتك المجانية لمدة 14 يوماً',

            'privacy_policy': 'سياسة الخصوصية',
            'terms_conditions': 'الشروط والأحكام',
            'contact_support': 'تواصل مع الدعم',
            'footer_copyright': '© جميع الحقوق محفوظة 2026'
        }
    };

    function changeLanguage(lang) {
        document.documentElement.setAttribute("dir", lang === 'ar' ? 'rtl' : 'ltr');
        document.documentElement.setAttribute("lang", lang);

        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            const value = translations[lang][key];
            if (value === undefined) return;

            const nestedEls = Array.from(el.querySelectorAll("[data-i18n]"));

            if (nestedEls.length > 0 || value.includes('<br>')) {
                // Preserve nested translatable children, replace surrounding text/markup
                nestedEls.forEach(child => child.remove());
                el.innerHTML = value;
                nestedEls.forEach(child => el.appendChild(child));
            } else {
                el.textContent = value;
            }
        });

        localStorage.setItem('lang', lang);
    }

    document.addEventListener('DOMContentLoaded', () => {
        const savedLang = localStorage.getItem('lang') || 'en';
        changeLanguage(savedLang);
    });

    function switchToArabic() { changeLanguage('ar'); }
    function switchToEnglish() { changeLanguage('en'); }
 



















// 2. الكرسر المخصص (Custom Cursor)

const cursorDot = document.querySelector(".cursor-dot");

if (cursorDot) {

window.addEventListener("mousemove", (e) => {

cursorDot.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;

});



const interactives = document.querySelectorAll('a, button, h1, p, h2, h3, span, svg, li, .nav-link');

interactives.forEach(el => {

el.addEventListener('mouseenter', () => cursorDot.classList.add('cursor-active'));

el.addEventListener('mouseleave', () => cursorDot.classList.remove('cursor-active'));

});
}















// document.addEventListener("DOMContentLoaded", () => {
//     const displayZone = document.querySelector('.display-zone');
//     const mainActiveCard = document.getElementById('main-active-card');
    
//     // الترتيب: A, B, C, D, E (الكرت يتحرك من A -> B -> C -> D -> E -> A)
//     const positions = ['pos-a', 'pos-b', 'pos-c', 'pos-d', 'pos-e'];

//     function rotateCards() {
//         const cards = Array.from(document.querySelectorAll('.card-item'));
        
//         // هنا التغيير: نأخذ الكرت الأول وننقله لنهاية السلسلة (للحركة من اليمين للشمال)
//         const firstCard = cards[0];
//         displayZone.appendChild(firstCard); 

//         // إعادة توزيع الكلاسات بناءً على الترتيب الجديد
//         const updatedCards = Array.from(document.querySelectorAll('.card-item'));
//         updatedCards.forEach((card, index) => {
//             card.className = 'card-item'; // مسح الكلاسات القديمة
//             card.classList.add(positions[index]); // إضافة الكلاس الجديد

//             // تحديث الفريم عند الوصول للمنتصف (pos-c)
//             if (positions[index] === 'pos-c') {
//                 mainActiveCard.src = card.src;
//             }
//         });
//     }

//     // تشغيل الحركة كل 4 ثوانٍ
//     setInterval(rotateCards, 6000);
// });