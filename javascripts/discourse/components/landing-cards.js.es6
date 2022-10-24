import Component from '@ember/component';
import { ajax } from 'discourse/lib/ajax';

export default Component.extend({
  tagName: 'section',
  classNames: ['landing-cards'],

  didInsertElement() {
    this._super(...arguments);

    ajax(`/c/${settings.announcements_topics_category}.json`).then(
      ({ topic_list }) => {
        this.set('announcementTopics', topic_list.topics.slice(0, 3));
      }
    );
  },
});
