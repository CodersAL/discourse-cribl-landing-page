import Component from '@ember/component';
import { ajax } from 'discourse/lib/ajax';

export default Component.extend({
  tagName: 'section',
  classNames: ['landing-card'],

  didInsertElement() {
    this._super(...arguments);
    const url = '/cribl/leaderboard.json?page=0&period=quarter';

    if (!this.currentUser) {
      this.set('notLoggedIn', true);
    }

    ajax(url)
      .then(({ data }) => {
        if (!data) {
          return;
        }

        const leaders = data.slice(0, 3).map((leader) => {
          const user = {
            id: leader.id,
            username: leader.username,
            name: leader.name,
            avatar_template: leader.avatar_template.replace('{size}', '45'),
            path: `/u/${leader.username}`,
          };

          return {
            rank: leader.mrank,
            points: leader.points,
            timestamp: leader.timestamp,
            user,
          };
        });
        this.set('leaders', leaders);
      })
      .catch(() => {
        this.set('dataFetchFailed', true);
      });
  },
});
