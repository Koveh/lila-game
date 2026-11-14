#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
npm run build
rsync -a --delete dist/ /var/www/lila/
echo "Deployed to /var/www/lila → https://lila.koveh.com/"
