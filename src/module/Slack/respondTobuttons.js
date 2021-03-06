// import lgbtqAllyshipArticle from './resources/lgbtqAllyshipArticle.json';
// import lgbtqAllyshipBook from './resources/lgbtqAllyshipBook.json';
// import antiRacismArticle from './resources/antiRacismArticle.json';
// import antiRacismBook from './resources/antiRacismBook.json';
// import antiSexismArticle from './resources/antiSexismArticle.json';
// import antiSexismBook from './resources/antiSexismBook.json';
// import autismAllyshipArticle from './resources/autismAllyshipArticle.json';
// import autismAllyshipBook from './resources/autismAllyshipBook.json';

// function respondToLgbtqAllyshipButton(selectedOption, feedback) {
//   if (selectedOption === 'article') {
//     feedback({
//       blocks: lgbtqAllyshipArticle,
//       replace_original: true,
//     });
//   } else {
//     feedback({
//       blocks: lgbtqAllyshipBook,
//       replace_original: true,
//     });
//   }
// }

// function respondToAntiRacismButton(selectedOption, respondWith) {
//   if (selectedOption === 'article') {
//     respondWith({
//       blocks: antiRacismArticle,
//       replace_original: true,
//     });
//   } else {
//     respondWith({
//       blocks: antiRacismBook,
//       replace_original: true,
//     });
//   }
// }

// function respondToAntiSexismButton(selectedOption, response) {
//   if (selectedOption === 'article') {
//     response({
//       blocks: antiSexismArticle,
//       replace_original: true,
//     });
//   } else {
//     response({
//       blocks: antiSexismBook,
//       replace_original: true,
//     });
//   }
// }

// function respondToAutismAllyshipButton(selectedOption, reply) {
//   if (selectedOption === 'article') {
//     reply({
//       blocks: autismAllyshipArticle,
//       replace_original: true,
//     });
//   } else {
//     reply({
//       blocks: autismAllyshipBook,
//       replace_original: true,
//     });
//   }
// }

// function respond(payload, answer) {
//   console.log('selectedOption: ', payload.actions[0].value);

//   switch (payload.callback_id) {
//     case 'anti_racism_article_book':
//       respondToAntiRacismButton(payload.actions[0].value, answer);
//       break;
//     case 'anti_sexism_article_book':
//       respondToAntiSexismButton(payload.actions[0].value, answer);
//       break;
//     case 'lgbtq_allyship_article_book':
//       respondToLgbtqAllyshipButton(payload.actions[0].value, answer);
//       break;
//     case 'autism_allyship_article_book':
//       respondToAutismAllyshipButton(payload.actions[0].value, answer);
//       break;
//     default:
//       respondToAntiRacismButton(payload.actions[0].value, answer);
//       break;
//   }
//   // Return a replacement message
//   return { text: 'Processing...' };
// }

// module.exports.respond = respond;
