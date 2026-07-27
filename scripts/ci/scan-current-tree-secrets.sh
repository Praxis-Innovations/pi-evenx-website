#!/usr/bin/env bash
set -euo pipefail

repository_root=$(git rev-parse --show-toplevel)
findings=()

while IFS= read -r -d '' relative_path; do
  absolute_path="$repository_root/$relative_path"
  [[ -f "$absolute_path" ]] || continue
  grep -Iq . "$absolute_path" || continue

  while IFS= read -r line_number; do
    [[ -n "$line_number" ]] && findings+=("$relative_path:$line_number")
  done < <(
    perl -ne '
      if (
        /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ ||
        /\bAKIA[0-9A-Z]{16}\b/ ||
        /\bgh[pousr]_[A-Za-z0-9_]{20,}\b/ ||
        /\bxox[baprs]-[A-Za-z0-9-]{10,}\b/ ||
        /\bAIza[0-9A-Za-z_-]{20,}\b/ ||
        /\bsk_live_[A-Za-z0-9]{16,}\b/ ||
        /\beyJ[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\.[A-Za-z0-9_-]{12,}\b/ ||
        /\b(?:postgres(?:ql)?|mysql|mongodb(?:\+srv)?):\/\/[^:\s\/]+:[^@\s\/]+@/i
      ) {
        print "$.\n";
      }
    ' "$absolute_path"
  )
done < <(git -C "$repository_root" ls-files --cached --others --exclude-standard -z)

if (( ${#findings[@]} > 0 )); then
  echo "Current-tree secret scan failed; matched values are redacted." >&2
  printf '%s\n' "${findings[@]/%/ (potential secret; value redacted)}" >&2
  exit 1
fi

echo "Current-tree secret scan passed (matched values are never printed)."
