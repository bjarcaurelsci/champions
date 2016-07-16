import './ChampionPortrait.scss';
import { STAR_RANK_LEVEL } from '../../data/model/Champion';
import { roleImage } from '../../data/roles';
import { effectIcon } from '../../data/effects';
import classNames from 'classnames';
import ImageIcon from '../ImageIcon.jsx';
import {
    getImage,
    IMAGE_EMPTY,
    IMAGE_STAR, IMAGE_STAR_AWAKENED,
    IMAGE_BADGE_RANK_UP, IMAGE_BADGE_LEVEL_MAX,
} from '../../util/images';
import lang from '../../service/lang';
/* eslint-disable no-unused-vars */
import m from 'mithril';
/* eslint-enable no-unused-vars */

function addSVG(element, isInitialized) {
    if(!isInitialized) {
        element.innerHTML = `
            <svg viewBox="0 0 220 220">
                <use xlink:href="#portrait-placeholder" />
            </svg>
        `;
    }
}

const ChampionPortrait = {
    view(ctrl, {
        champion, events, selected, neighbor, editing, effects,
        showBadges = true, showPi = true, scalePi = 1,
        onclick, draggable, droppable,
    }) {
        const { uid, stars, rank, level, pi, typeId, awakened, role } = champion.attr;
        const starIcon = awakened? (
            <ImageIcon src={ IMAGE_STAR_AWAKENED } />
        ): (
            <ImageIcon src={ IMAGE_STAR } />
        );
        const starImages = [];
        for(let i=0; i<stars; i++)
            starImages.push(starIcon);
        const portraitImage = (uid !== null) && getImage(`images/champions/portrait_${ uid }.png`);
        const hasPortraitImage = Boolean(portraitImage);
        let title = null;
        if(uid !== null) {
            title = [];
            if(effects && effects.length) {
                title.push(
                    <div class={ classNames('title-field', 'title-field-effects') }>
                        { effects.map(({ effectId, effectAmount }) => [ (
                            <Icon icon={ effectIcon(effectId) } after />
                        ), (
                            <span>{ effectAmount }%</span>
                        ) ]) }
                    </div>
                );
            }
            if(showPi && (pi || champion.pi)) {
                title.push(
                    <div
                        class={ classNames('title-field', 'title-field-pi', {
                            'title-field-pi-custom': pi && pi > 0,
                        }) }
                    >{ (pi || champion.pi * scalePi) | 0 }</div>
                );
            }
            const name = lang.get(`champion-${ uid }-shortname`, null) || lang.get(`champion-${ uid }-name`);
            title.push(
                <div class="title-field title-field-name">{ name }</div>
            );
        }
        const isMaxed = STAR_RANK_LEVEL[ stars ] &&
            STAR_RANK_LEVEL[ stars ][ rank ] &&
            STAR_RANK_LEVEL[ stars ].ranks === rank &&
            STAR_RANK_LEVEL[ stars ][ rank ].levels === level;
        const isRankUp = !isMaxed && STAR_RANK_LEVEL[ stars ] &&
            STAR_RANK_LEVEL[ stars ][ rank ] &&
            STAR_RANK_LEVEL[ stars ].ranks > rank &&
            STAR_RANK_LEVEL[ stars ][ rank ].levels === level;
        const upgradeIcon = !showBadges? null:
        (isMaxed && (showBadges === 'upgrade' || showBadges === true))? (
            <ImageIcon src={ IMAGE_BADGE_LEVEL_MAX } />
        ):
        (isRankUp && (showBadges === 'upgrade' || showBadges === true))? (
            <ImageIcon src={ IMAGE_BADGE_RANK_UP } />
        ): null;
        const roleIconImage = ((showBadges === 'role' || showBadges === true) && roleImage(role))? (
            <ImageIcon src={ roleImage(role) } />
        ): null;
        return (
            <div
                m="ChampionPortrait"
                class={ classNames('champion-portrait', `champion--${ typeId }`, {
                    'champion--selected': selected,
                    'champion--neighbor': neighbor,
                    'champion--editing': editing,
                    'champion--null': uid === null,
                }) }
            >
                <div class={ classNames('container', 'no-select') }>
                    <div
                        class={ classNames('inner', { 'clickable': onclick }) }
                        { ...events }
                        droppable={ droppable }
                        draggable={ draggable }
                        onclick={ onclick }
                        title={ uid && lang.get(`champion-${ uid }-name`) || '' }
                    >
                        <div class="portrait">
                            <div
                                class={ classNames('portrait-image', { 'portrait-image--hidden': hasPortraitImage }) }
                                config={ addSVG }
                            />
                            <div class={ classNames('portrait-image', { 'portrait-image--hidden': !hasPortraitImage }) }>
                                <img src={ portraitImage && portraitImage.src || IMAGE_EMPTY } />
                            </div>
                        </div>
                        <div class="title">{ title }</div>
                        <div class={ classNames('stars', { 'stars--awakened': awakened }) }>
                            { starImages }
                        </div>
                        <div class={ classNames('upgrade', { 'upgrade-max': isMaxed, 'upgrade-rank-up': isRankUp }) }>
                            { upgradeIcon }
                        </div>
                        <div class={ classNames('role') }>
                            { roleIconImage }
                        </div>
                    </div>
                </div>
            </div>
        );
    },
};

export default ChampionPortrait;
