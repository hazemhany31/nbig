// 1. عرض رسالة نجاح بعد إرسال النموذج مع تأثير Fade (متوافق مع Google Sheet أو بدون)
const contactForm = document.querySelector('#contact-form');
const successMessage = document.getElementById('success-msg') || document.querySelector('.form-success');

if (contactForm && successMessage) {
    contactForm.addEventListener('submit', (e) => {
        // إذا كان فيه Google Script هيمنعه بنفسه، لو مش موجود نمنع الإرسال الافتراضي
        if (!contactForm.hasAttribute('action')) e.preventDefault();

        successMessage.classList.add('visible');
        successMessage.style.display = 'inline';

        setTimeout(() => {
            successMessage.classList.remove('visible');
            successMessage.style.display = 'none';
        }, 5000);

        contactForm.reset();
    });
}

// 2. تغيير لون الهيدر عند التمرير
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

// 3. تشغيل قائمة الموبايل
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        menuToggle.setAttribute(
            'aria-expanded',
            navMenu.classList.contains('open') ? 'true' : 'false'
        );
    });
}

// 4. إغلاق القائمة عند الضغط على أي رابط
if (navMenu) {
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (menuToggle) menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    });
}

// 5. التمرير السلس مع حساب ارتفاع الهيدر
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            const y = target.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    });
});

// 6. زر الرجوع للأعلى (responsive)
let scrollToTopBtn = document.querySelector('.scroll-to-top');
if (!scrollToTopBtn) {
    scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    document.body.appendChild(scrollToTopBtn);
}

function adaptScrollBtnPosition() {
    if (window.innerWidth <= 600) {
        // في الموبايل: وسط تحت
        scrollToTopBtn.style.right = '50%';
        scrollToTopBtn.style.bottom = '18px';
        scrollToTopBtn.style.left = '50%';
        scrollToTopBtn.style.transform = 'translateX(-50%)';
        scrollToTopBtn.style.width = '38px';
        scrollToTopBtn.style.height = '38px';
        scrollToTopBtn.style.fontSize = '1.2em';
    } else {
        // في الديسكتوب: يمين تحت
        scrollToTopBtn.style.right = '20px';
        scrollToTopBtn.style.bottom = '20px';
        scrollToTopBtn.style.left = '';
        scrollToTopBtn.style.transform = '';
        scrollToTopBtn.style.width = '40px';
        scrollToTopBtn.style.height = '40px';
        scrollToTopBtn.style.fontSize = '1.5em';
    }
}

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    const toggleScrollBtn = () => {
        scrollToTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
    };

    window.addEventListener('scroll', toggleScrollBtn);
    window.addEventListener('resize', adaptScrollBtnPosition);
    adaptScrollBtnPosition();
    toggleScrollBtn();
}

// 7. social bar responsive opacity
const socialBar = document.querySelector('.social-bar-simple');
function adaptSocialBar() {
    if (!socialBar) return;
    if (window.innerWidth <= 600) {
        // موبايل: أفقي تحت
        socialBar.style.position = "fixed";
        socialBar.style.top = "";
        socialBar.style.left = "50%";
        socialBar.style.bottom = "0";
        socialBar.style.transform = "translateX(-50%)";
        socialBar.style.flexDirection = "row";
        socialBar.style.padding = "7px 4px";
        socialBar.style.borderRadius = "15px 15px 0 0";
    } else {
        // ديسكتوب: جانبي
        socialBar.style.position = "fixed";
        socialBar.style.top = "50%";
        socialBar.style.left = "12px";
        socialBar.style.bottom = "";
        socialBar.style.transform = "translateY(-50%)";
        socialBar.style.flexDirection = "column";
        socialBar.style.padding = "13px 7px";
        socialBar.style.borderRadius = "9px";
    }
}
if (socialBar) {
    window.addEventListener('resize', adaptSocialBar);
    adaptSocialBar();

    window.addEventListener('scroll', () => {
        if (window.innerWidth <= 600) {
            socialBar.style.opacity = window.scrollY > 60 ? '1' : '0.8';
        } else {
            socialBar.style.opacity = window.scrollY > 100 ? '1' : '0.7';
        }
    });
}