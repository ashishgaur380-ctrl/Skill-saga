from pathlib import Path

p = Path('app/src/main/assets/index.html')
s = p.read_text(encoding='utf-8')
needle = '<script src="final-ui.js"></script>'
if needle not in s:
    marker = '</body>'
    if marker not in s:
        raise SystemExit('index.html has no </body> marker; aborting without changes')
    s = s.replace(marker, needle + '\n' + marker, 1)
    p.write_text(s, encoding='utf-8')
    print('Injected final-ui.js into index.html')
else:
    print('final-ui.js already injected')
