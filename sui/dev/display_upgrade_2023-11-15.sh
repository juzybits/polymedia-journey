#!/usr/bin/env bash

set -ueo pipefail

PACKAGE=0x7c423c0f1ab19c99155c24e98fdb971453b699c90ab579b23b38103060ea26db
DISPLAY=0xda456cb62a50084226f866a5e8d244485a2cd5e2fb96ca1f4103702a2aa03d4d
DISPLAY_TYPE="$PACKAGE::journey::Quest"

edit_display_field() {
    local name=$1
    local value=$2
    sui client call \
     --gas-budget 700700700 \
     --package 0x2 \
     --module display \
     --function edit \
     --type-args "$DISPLAY_TYPE" \
     --args "$DISPLAY" "$name" "$value"
}

update_display_version() {
    sui client call \
     --gas-budget 700700700 \
     --package 0x2 \
     --module display \
     --function update_version \
     --type-args "$DISPLAY_TYPE" \
     --args "$DISPLAY"
}

edit_display_field 'project_url' 'https://journey.polymedia.app'
edit_display_field 'link' 'https://journey.polymedia.app'
edit_display_field 'image_url' 'https://journey.polymedia.app/img/card_explorer.webp'
update_display_version
