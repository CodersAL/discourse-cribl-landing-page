import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  classNames: ['landing-card'],

  didInsertElement() {
    this._super(...arguments);
    const categoryId = Number(settings.announcements_topics_category);
    const categories = this.site.categories;
    const category = categories.find((c) => c.id === categoryId);
    this.set('category', category);
    //this.set('categoryColor', `background-color: #${category.color}`);
  },
});
