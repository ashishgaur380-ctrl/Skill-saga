from pathlib import Path

p = Path('app/src/main/assets/index.html')
s = p.read_text(encoding='utf-8')

for src in ('final-ui.js', 'final-ui-links.js'):
    needle = f'<script src="{src}"></script>'
    if needle not in s:
        marker = '</body>'
        if marker not in s:
            raise SystemExit('index.html has no </body> marker; aborting without changes')
        s = s.replace(marker, needle + '\n' + marker, 1)
        print(f'Injected {src}')
    else:
        print(f'{src} already injected')

p.write_text(s, encoding='utf-8')
