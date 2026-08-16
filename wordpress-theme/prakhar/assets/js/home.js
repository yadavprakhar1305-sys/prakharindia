<?php
/**
 * Front page cart script (homepage pricing strip).
 *
 * @package Prakhar
 */
const HOME_PRICES = { labour: 500, mistri: 700 };
const HOME_MIN = { labour: 50, mistri: 20 };
const HOME_MAX = { labour: 500, mistri: 200 };
let homeCart = { labour: 0, mistri: 0 };

function homeQty(type, delta) {
  const cur = homeCart[type];
  const nxt = Math.max(0, Math.min(HOME_MAX[type], cur + delta));
  homeCart[type] = nxt;
  const el = document.getElementById('home' + type.charAt(0).toUpperCase() + type.slice(1) + 'Qty');
  el.value = nxt;
  document.getElementById('home' + type.charAt(0).toUpperCase() + type.slice(1) + 'Minus').disabled = nxt === 0;
  document.getElementById('home' + type.charAt(0).toUpperCase() + type.slice(1) + 'Plus').disabled = nxt >= HOME_MAX[type];
  updateHomeCart();
}

function homeSetQty(type, val) {
  const nxt = Math.max(0, Math.min(HOME_MAX[type], parseInt(val) || 0));
  homeCart[type] = nxt;
  document.getElementById('home' + type.charAt(0).toUpperCase() + type.slice(1) + 'Qty').value = nxt;
  updateHomeCart();
}

function updateHomeCart() {
  const l = homeCart.labour, m = homeCart.mistri;
  const total = l * HOME_PRICES.labour + m * HOME_PRICES.mistri;
  const items = l + m;
  document.getElementById('homeCartTotal').textContent = '₹' + total.toLocaleString();
  document.getElementById('homeCartItems').textContent = items;
  const btn = document.getElementById('homeBookBtn');
  const ok = (l >= HOME_MIN.labour || l === 0) && (m >= HOME_MIN.mistri || m === 0) && items > 0;
  btn.style.pointerEvents = ok ? 'auto' : 'none';
  btn.style.opacity = ok ? '1' : '0.5';
}