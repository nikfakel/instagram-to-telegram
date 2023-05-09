const util = require("util");
const fetch = require("node-fetch");

const a = {

}

const post = {
  __typename: "GraphVideo",
  id: "3079594684799094876",
  gating_info: null,
  fact_check_overall_rating: null,
  fact_check_information: null,
  media_overlay_info: null,
  sensitivity_friction_info: null,
  sharing_friction_info: {
    should_have_sharing_friction: false,
    bloks_app_url: null,
  },
  dimensions: { height: 567, width: 320 },
  display_url:
    "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAzGv_i6Ka2nqneDuy0wZMMBQmYIvu0E9jqbroa2zuNRw&oe=645B6316&_nc_sid=86f79a",
  display_resources: [
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAzGv_i6Ka2nqneDuy0wZMMBQmYIvu0E9jqbroa2zuNRw&oe=645B6316&_nc_sid=86f79a",
      config_width: 640,
      config_height: 1134,
    },
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAzGv_i6Ka2nqneDuy0wZMMBQmYIvu0E9jqbroa2zuNRw&oe=645B6316&_nc_sid=86f79a",
      config_width: 750,
      config_height: 1328,
    },
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAzGv_i6Ka2nqneDuy0wZMMBQmYIvu0E9jqbroa2zuNRw&oe=645B6316&_nc_sid=86f79a",
      config_width: 1080,
      config_height: 1913,
    },
  ],
  is_video: true,
  media_preview:
    "ABgq0FtZG9Pzp8dud2GqTzdvU4GKqXty8YUxnBOecA9OR145pFaloDcoZeMiim2EhlgVj1BYH86KBGVCZrpinmohTrgZ7446A+nWtH7OkuN4yEz+fTp0qNGtY06AnqT0JI9cZP4dKdFKJFZuMMc8fUUFWLkYWEYjwAxz+OP60VUR0aT0wOfoO9FAjJtbOWb5gQvXlst+n3R19TWjp0LQ5STkntnIHH0Az9KvnhsdvSqLMftYXJxt6duoqWUJMqiRfY/5z/nH1oouv9cfrRQ0CP/Z",
  tracking_token:
    "eyJ2ZXJzaW9uIjo1LCJwYXlsb2FkIjp7ImlzX2FuYWx5dGljc190cmFja2VkIjp0cnVlLCJ1dWlkIjoiNTJmY2JlYzIyYWY5NDNkOGFjNmRlMjY1YWZlMmNhZjkzMDc5NTk0Njg0Nzk5MDk0ODc2In0sInNpZ25hdHVyZSI6IiJ9",
  has_upcoming_event: false,
  edge_media_to_tagged_user: {
    edges: [
      {
        node: {
          user: {
            full_name: "badgalriri",
            followed_by_viewer: false,
            id: "25945306",
            is_verified: true,
            profile_pic_url:
              "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-19/11032926_1049846535031474_260957621_a.jpg?_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=GWn35eZ0-SwAX8diGiS&edm=APU89FABAAAA&ccb=7-5&oh=00_AfDnywgqHdOtA1Q0T5__WoL-Nws2bh2tmGRpOzQjXCpAWg&oe=645F0D3A&_nc_sid=86f79a",
            username: "badgalriri",
          },
          x: 0,
          y: 0,
        },
      },
      {
        node: {
          user: {
            full_name: "FENTY BEAUTY BY RIHANNA",
            followed_by_viewer: false,
            id: "2999682241",
            is_verified: true,
            profile_pic_url:
              "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-19/55726598_2266769000046163_2919284984713838592_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=DkAfmzhku54AX_QpD2T&edm=APU89FABAAAA&ccb=7-5&oh=00_AfD7ejte2wY4OAHN72OORpC5i_teysu_wHANZGNYYWlM1Q&oe=645FA23E&_nc_sid=86f79a",
            username: "fentybeauty",
          },
          x: 0,
          y: 0,
        },
      },
      {
        node: {
          user: {
            full_name: "Ulta Beauty",
            followed_by_viewer: false,
            id: "22841482",
            is_verified: true,
            profile_pic_url:
              "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-19/314906464_177516098275440_5004718203867652086_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=w3uh0JbrXqAAX9dnIUk&edm=APU89FABAAAA&ccb=7-5&oh=00_AfDgHa0nnUKOApiVBv7gFJJS5JHmShvMdVjxQIxQy4hhXw&oe=645FA91E&_nc_sid=86f79a",
            username: "ultabeauty",
          },
          x: 0,
          y: 0,
        },
      },
    ],
  },
  dash_info: {
    is_dash_eligible: false,
    video_dash_manifest: null,
    number_of_qualities: 0,
  },
  has_audio: true,
  video_url:
    "https://instagram.feoh8-1.fna.fbcdn.net/v/t50.2886-16/341391273_937011097428795_1624783949253519704_n.mp4?_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=AIRHkzXYrsgAX-5vAGN&edm=APU89FABAAAA&ccb=7-5&oh=00_AfDgif161Gs9YsP-Po1kxIjzG3pg2YmqmIrbOwD8XbOyxg&oe=645B5B56&_nc_sid=86f79a",
  video_view_count: 344486,
  edge_media_to_caption: { edges: [{ node: { text: "Stargirl 🤍⭐" } }] },
  shortcode: "Cq86wynoZBc",
  edge_media_to_comment: {
    count: 505,
    page_info: { has_next_page: true, end_cursor: "" },
  },
  edge_media_to_sponsor_user: { edges: [] },
  is_affiliate: false,
  is_paid_partnership: false,
  comments_disabled: false,
  taken_at_timestamp: 1681336773,
  edge_media_preview_like: { count: 61141, edges: [] },
  owner: { id: "49294552318", username: "rihannaofficiall" },
  location: null,
  nft_asset_info: null,
  viewer_has_liked: false,
  viewer_has_saved: false,
  viewer_has_saved_to_collection: false,
  viewer_in_photo_of_you: false,
  viewer_can_reshare: true,
  thumbnail_src:
    "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=c0.123.320.320a_dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBEjfdIwdz98JKZukkbVH8APOYks5dYK2b4KnhKlgAm_A&oe=645B6316&_nc_sid=86f79a",
  thumbnail_resources: [
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=c0.123.320.320a_dst-jpg_e15_s150x150&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfDYrL6ep7FsZUBpPwFBYMCEmlhIph4RflewK0H5sdduwQ&oe=645B6316&_nc_sid=86f79a",
      config_width: 150,
      config_height: 150,
    },
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=c0.123.320.320a_dst-jpg_e15_s240x240&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBCHBPyvgKkTnEO8pC2liTeg00EK8sA4l_7skWaaPmxIA&oe=645B6316&_nc_sid=86f79a",
      config_width: 240,
      config_height: 240,
    },
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=c0.123.320.320a_dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBEjfdIwdz98JKZukkbVH8APOYks5dYK2b4KnhKlgAm_A&oe=645B6316&_nc_sid=86f79a",
      config_width: 320,
      config_height: 320,
    },
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=c0.123.320.320a_dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBEjfdIwdz98JKZukkbVH8APOYks5dYK2b4KnhKlgAm_A&oe=645B6316&_nc_sid=86f79a",
      config_width: 480,
      config_height: 480,
    },
    {
      src: "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=c0.123.320.320a_dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfBEjfdIwdz98JKZukkbVH8APOYks5dYK2b4KnhKlgAm_A&oe=645B6316&_nc_sid=86f79a",
      config_width: 640,
      config_height: 640,
    },
  ],
  coauthor_producers: [],
  pinned_for_users: [],
  product_type: "clips",
};

const TELEGRAM_TOKEN = "";

const log = (object) => {
  console.log(
    util.inspect(object, { showHidden: false, depth: null, colors: true })
  );
};

const sendMessage = async (method, data) => {
  try {
    const request = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_TOKEN}/${method}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    return request;
  } catch (error) {
    log(error);
  }
};

(async () => {
  const sendPost = async () => {
    try {
      const post = {
        chat_id: "",
        photo:
          "https://instagram.feoh8-1.fna.fbcdn.net/v/t51.2885-15/340839509_536936658622767_3545526465501447426_n.jpg?stp=dst-jpg_e15&_nc_ht=instagram.feoh8-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=JCqmHhT7iK4AX_IpPqx&edm=APU89FABAAAA&ccb=7-5&oh=00_AfAzGv_i6Ka2nqneDuy0wZMMBQmYIvu0E9jqbroa2zuNRw&oe=645B6316&_nc_sid=86f79a",
        caption: "caption",
      };
      const response = await sendMessage("sendPhoto", post);
      log(response);
    } catch (error) {
      log(error);
    }
  };

  sendPost();
})();
