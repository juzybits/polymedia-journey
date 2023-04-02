module polymedia_journey::journey
{
    use std::string::{String, utf8};
    use sui::display;
    use sui::object::{Self, UID};
    use sui::package;
    use sui::transfer;
    use sui::tx_context::{Self, TxContext};

    use polymedia_profile::profile::{Profile, add_dynamic_object_field};

    struct Quest has key, store {
        id: UID,
        name: String,
        image_url: String,
        description: String,
    }

    public entry fun save_quest(
        profile: &mut Profile,
        name: vector<u8>,
        image: vector<u8>,
        description: vector<u8>,
        ctx: &mut TxContext,
    ) {
        let quest_name = utf8(name);
        let quest = Quest {
            id: object::new(ctx),
            name: quest_name,
            image_url: utf8(image),
            description: utf8(description),
        };
        add_dynamic_object_field(profile, quest_name, quest);
    }

    // One-Time-Witness
    struct JOURNEY has drop {}

    fun init(otw: JOURNEY, ctx: &mut TxContext)
    {
        let publisher = package::claim(otw, ctx);

        let quest_display = display::new_with_fields<Quest>(
            &publisher,
            vector[
                utf8(b"name"),
                utf8(b"image_url"),
                utf8(b"description"),
                utf8(b"link"),
                utf8(b"project_url"),
                utf8(b"creator"),
            ], vector[
                utf8(b"{name}"),
                utf8(b"{image_url}"),
                utf8(b"{description}"),
                utf8(b"https://mountsogol.com"),
                utf8(b"https://mountsogol.com"),
                utf8(b"https://polymedia.app")
            ], ctx
        );

        display::update_version(&mut quest_display);

        transfer::public_transfer(publisher, tx_context::sender(ctx));
        transfer::public_transfer(quest_display, tx_context::sender(ctx));
    }
}
