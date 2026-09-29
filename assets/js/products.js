// Shared script of the product pages: analytics, mobile menu, code tabs and copy
// buttons. Every page works without it; it only adds behaviour.

// Google Analytics, the same property as the home page.
window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'G-B4X009BE1F');

(function () {
    'use strict';

    // Mobile navigation.
    document.querySelectorAll('.navbar-burger').forEach(function (burger) {
        var menu = document.getElementById(burger.dataset.target);
        if (!menu) return;
        burger.addEventListener('click', function () {
            var open = burger.classList.toggle('is-active');
            menu.classList.toggle('is-active', open);
            burger.setAttribute('aria-expanded', String(open));
        });
    });

    // Code tabs: without JS every panel is shown under its own heading.
    document.querySelectorAll('.code-tabs').forEach(function (box) {
        var tabs = Array.prototype.slice.call(box.querySelectorAll('[role="tab"]'));
        if (!tabs.length) return;
        box.classList.add('js-tabs');

        function select(tab, focus) {
            tabs.forEach(function (t) {
                var on = t === tab;
                t.setAttribute('aria-selected', String(on));
                t.tabIndex = on ? 0 : -1;
                t.parentElement.classList.toggle('is-active', on);
                var panel = document.getElementById(t.getAttribute('aria-controls'));
                if (panel) panel.hidden = !on;
            });
            if (focus) tab.focus();
        }

        tabs.forEach(function (tab, i) {
            tab.addEventListener('click', function (e) {
                e.preventDefault();
                select(tab, false);
            });
            tab.addEventListener('keydown', function (e) {
                var next = null;
                if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
                if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
                if (e.key === 'Home') next = tabs[0];
                if (e.key === 'End') next = tabs[tabs.length - 1];
                if (next) {
                    e.preventDefault();
                    select(next, true);
                }
            });
        });

        var active = tabs.filter(function (t) { return t.getAttribute('aria-selected') === 'true'; })[0] || tabs[0];
        select(active, false);
    });

    // Copy buttons on code blocks.
    if (!navigator.clipboard) return;
    document.querySelectorAll('.code-block').forEach(function (block) {
        var code = block.querySelector('pre');
        if (!code) return;
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'copy-btn';
        btn.textContent = 'Copy';
        btn.setAttribute('aria-label', 'Copy code to clipboard');
        btn.addEventListener('click', function () {
            navigator.clipboard.writeText(code.innerText.replace(/\n$/, '')).then(function () {
                btn.textContent = 'Copied';
                setTimeout(function () { btn.textContent = 'Copy'; }, 1600);
            }, function () {
                btn.textContent = 'Press Ctrl+C';
            });
        });
        block.appendChild(btn);
    });
})();
