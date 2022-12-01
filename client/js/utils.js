// deno-lint-ignore-file no-unused-vars
const print = (...args) => console.log(...args);

const getRandomHex = () => {
  const letters = "0123456789ABCDEF".split("");
  let color = "";
  for (let i = 0; i < 6; i++) {
    const random = Math.floor(Math.random() * 16);
    color += letters[random];
  }
  return color;
}

const fetchRandomColor = async () => {
  const randomHex = getRandomHex();
  const baseUrl = "https://www.thecolorapi.com";
  const endpoint = `/id?hex=${randomHex}`;
  const response = await fetch(baseUrl + endpoint);
  const json = await response.json();
  return json;
};

const colorAllTagsRandomly = () => {
  $(document)
    .find(".tag")
    .each(function () {
      colorTagRandomly(this);
    });
};

const colorTagRandomly = async (tag) => {
  const color = await fetchRandomColor();
  const hex = color.name.closest_named_hex;
  let textHex = color.contrast.value;
  if (textHex === "#000000") textHex = "hsl(0, 0%, 5%)";
  colorTag({
    tag,
    color: textHex,
    bgColor: hex,
  });
};

const convertDatumToHtml = (datum) => {
  const datumEl = $('<div class="datum">').append(
    $('<span class="tags">').append(
      $('<span class="tags-scroll-container">').append(
        ...datum.tags.map((tag) =>
          $('<span class="tag">').append(
            $('<span class="tag-name">').text(tag.name).css({
              "color": tag.contrastColor,
              "background-color": tag.color,
              "border-color": tag.color,
            }),
            tag.value
              ? $('<span class="tag-value">').text(tag.value).css({
                  "color": tag.color,
                  "background-color": tag.contrastColor,
                  "border-color": tag.color,
                })
              : null
          )
        ),
				$('<span class="timestamp-fade-spacer">')
      )
    ),
    $('<span class="tags-fade">'),
    $('<span class="timestamp">').text(getTimestamp(datum.time)),
    $('<button class="open-datum-menu">').append(
      $('<i class="fa-solid fa-ellipsis">')
    )
  )
  $('.datum-menu').first().clone().appendTo(datumEl)
  datumEl.data('id', datum.id)
  datumEl.data('time', datum.time)
  return datumEl
}

const convertHtmlToDatum = (html) => {
  const tags = $(html)
    .find(".tag")
    .map(function () {
      const name = $(this).find(".tag-name").text().trim();
      const value = $(this).find(".tag-value").text().trim();
      return {
        name,
        value: value || null,
      };
    })
    .get(); // get converts object into array
  const id = $(html).data('id')
  const time = $(html).data('time')
  return {
    id,
    time,
    tags,
  };
};

const colorTag = ({ tag, color, bgColor }) => {
  $(tag).find(".tag-name").css("color", color);
  $(tag).find(".tag-name").css("background-color", bgColor);
  $(tag).find(".tag-name").css("border-color", bgColor);
  $(tag).find(".tag-value").css("color", bgColor);
  $(tag).find(".tag-value").css("background-color", color);
  $(tag).find(".tag-value").css("border-color", bgColor);
};

const fetchRandomDatum = async () => {
  const numberOfTags = Math.ceil(Math.random() * 5);
  const response = await fetch("words.json");
  const words = await response.json();
  const tagNames = [];
  for (let i = 0; i < numberOfTags; i++) {
    const randomIndex = Math.floor(Math.random() * words.length);
    tagNames.push(words[randomIndex]);
  }
  const tags = tagNames.map(async (tagName) => {
    let tagValue = null;
    const hasTagValue = Math.floor(Math.random() * 3); // 67% chance
    if (hasTagValue) {
      const isWord = Math.round(Math.random());
      if (isWord) {
        const randomIndex = Math.floor(Math.random() * words.length);
        tagValue = words[randomIndex];
      } else {
        tagValue = Math.ceil(Math.random() * 100);
      }
    }
    const colorData = await fetchRandomColor();
    const color = colorData.name.closest_named_hex;
    let contrastColor = colorData.contrast.value;
    if (contrastColor === "#000000") contrastColor = "hsl(0, 0%, 5%)";
    return {
      name: tagName,
      value: tagValue,
      color,
      contrastColor,
    };
  });
  return {
    tags: await Promise.all(tags),
    id: 1,
    time: Date.now(),
  };
};

const updateAddDatumBtnState = () => {
  const tags = $("#datum-bar").find(".tag");
  if (tags.length) {
    $("#datum-bar").find("#add-datum i").addClass("active");
  } else {
    $("#datum-bar").find("#add-datum i").removeClass("active");
  }
};

const getTimestamp = time => {
	const date = new Date(time)
	const diff = (new Date().getTime() - date.getTime()) / 1000
	const dayDiff = Math.floor(diff / 86400)

	return (
		(dayDiff === 0 &&
			(diff < 5 && "Just now")
			|| (diff < 60 && Math.floor(diff) + 's')
			|| (diff < 120 && '1m')
			|| (diff < 3600 && Math.floor(diff / 60) + 'm')
			|| (diff < 7200 && '1h')
			|| (diff < 86400 && Math.floor(diff / 3600) + 'h')
			|| (dayDiff < 7 && dayDiff + 'd')
			|| (dayDiff < 30 && Math.floor(dayDiff / 7) + 'w')
			|| (dayDiff < 365 && Math.floor(dayDiff / 30) + 'mo')
			|| (Math.floor(dayDiff / 365) + 'y')
	))
}

const renderView = (viewName = '/', firstLoad = false) => {
  $('.view').hide()
  // if (viewName === '/') {
  //   $('#list').show()
  //   if (firstLoad) {
  //     history.replaceState({}, '', '/list')
  //   } else {
  //     history.pushState({}, '', '/list')
  //   }
  //   document.title = 'Datums - List View'
  //   return
  // }
  if (viewName[0] === '/') viewName = viewName.substring(1)
  const viewNames = $('.view').map(function() {
    return this.id
  }).get()
  if (!viewNames.includes(viewName) || viewName === '404') {
    $('#404').show()
    history.pushState({ view: viewName }, '/404', '/404')
    document.title = 'Datums - Page Not Found'
    return
  }
  $(`#${viewName}`).show()
  history.pushState({ view: viewName }, `/${viewName}`, `/${viewName}`)
  const capitalizedViewName = viewName.charAt(0).toUpperCase() + viewName.slice(1)
  document.title = `Datums - ${capitalizedViewName} View`
}
