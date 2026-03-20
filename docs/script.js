// Copy to clipboard
document.querySelectorAll('.copy-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var targetId = btn.getAttribute('data-target');
    var target = document.getElementById(targetId);
    if (!target) return;
    var text = target.textContent;
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'Copied!';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.textContent = 'Copy';
        btn.classList.remove('copied');
      }, 2000);
    });
  });
});

// Tabs
document.querySelectorAll('.tab-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var tab = btn.getAttribute('data-tab');
    var container = btn.closest('.tabs');

    container.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
    container.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });

    btn.classList.add('active');
    var panel = document.getElementById('tab-' + tab);
    if (panel) panel.classList.add('active');

    // Re-highlight any un-highlighted code in the newly visible panel
    if (panel && window.Prism) {
      panel.querySelectorAll('code:not(.prism-highlighted)').forEach(function(el) {
        Prism.highlightElement(el);
        el.classList.add('prism-highlighted');
      });
    }
  });
});

// Collapsible schema cards
document.querySelectorAll('[data-collapsible]').forEach(function(header) {
  header.addEventListener('click', function() {
    header.closest('.schema-card').classList.toggle('collapsed');
  });
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(function(link) {
  link.addEventListener('click', function() {
    var toggle = document.getElementById('nav-toggle');
    if (toggle) toggle.checked = false;
  });
});

// Highlight all code on load
if (window.Prism) {
  Prism.highlightAll();
}