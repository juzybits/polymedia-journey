module polymedia_journey::journey
{
    use std::string::{Self, String};
    use sui::object::{Self, UID};
    use sui::tx_context::{TxContext};
    use sui::url::{Self, Url};

    use polymedia_profile::profile::{Profile, add_dynamic_object_field};

    struct Quest has key, store {
        id: UID,
        name: String,
        url: Url, // image URL
    }

    public entry fun save_quest(
        profile: &mut Profile,
        quest_name: vector<u8>,
        quest_image: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let name = string::utf8(quest_name);
        let url = url::new_unsafe_from_bytes(quest_image);
        let quest = Quest {
            id: object::new(ctx),
            name,
            url,
        };
        add_dynamic_object_field(profile, name, quest);
    }
}
