from base64 import b64decode
from pathlib import Path
from wvdump.keybox import parse_keybox

def _raw() -> bytes:
    txt = Path(__file__).parent / "fixtures" / "keybox_7283.txt"
    return b64decode(txt.read_text().strip())

def test_parse_keybox_fields():
    kb = parse_keybox(_raw())
    assert kb.system_id == 7283
    assert kb.level == "LVL3"
    assert len(kb.device_id) == 32
    assert len(kb.device_key) == 16
    assert len(kb.device_token) == 72
