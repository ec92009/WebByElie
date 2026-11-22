"""Verified public creator accounts; shared by the shop generators."""
from html import escape

PROFILES = {
    'june': ('June Rowan', [('YouTube', 'https://www.youtube.com/@june.rowan.webbyelie'), ('Instagram', 'https://www.instagram.com/june.rowan.daily/'), ('TikTok', 'https://www.tiktok.com/@june.rowan.daily')]),
    'nora': ('Nora Vela', [('YouTube', 'https://www.youtube.com/@nora.vela.webbyelie'), ('Instagram', 'https://www.instagram.com/nora.vela.builds/')]),
    'elena': ('Elena Brooks', [('YouTube', 'https://www.youtube.com/@elena.brooks.webbyelie'), ('Instagram', 'https://www.instagram.com/elena.brooks.notes/')]),
    'alex': ('Alex Ward', [('YouTube', 'https://www.youtube.com/@alex.ward.webbyelie')]),
}


def social_links(key):
    """Render accessible, tracked links only for confirmed creator accounts."""
    name, profiles = PROFILES[key]
    links = ''.join(f'<a class="social-platform" data-wst-cta="{label.lower()}_follow" href="{escape(url, quote=True)}" target="_blank" rel="noopener">{label}<span aria-hidden="true">↗</span></a>' for label, url in profiles)
    return f'<section class="wrap creator-social" id="follow" aria-labelledby="follow-title"><div><p class="eyebrow">Keep watching</p><h2 id="follow-title">Follow {escape(name.split()[0])}</h2></div><nav aria-label="{escape(name)} social profiles">{links}</nav></section>'
