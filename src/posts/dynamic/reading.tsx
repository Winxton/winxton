import React, { useState } from 'react'
import DynamicText from '../../utils/DynamicText'


type Range = 'DAY' | 'WEEK' | 'MONTH' | 'YEAR' | '10_YEARS';
type MediumKey = 'TWEETS' | 'SHORT_BLOGS' | 'LONG_BLOGS' | 'BOOKS'

const CHAR_PER_WORD = 5.1
const TWEET_WORDS = 140 / CHAR_PER_WORD
const SHORT_BLOG_WORDS = 1120
const LONG_BLOG_WORDS = 10000
const BOOK_WORD_COUNT = 90000


function Reading() {
    const [wordsPerMinute, setWordsPerMinute] = useState(200)
    const [minutesPerDay, setMinutesPerDay] = useState(30)
    const [range, setRange] = useState('MONTH')

    function getDefaultMap() {
        const defaultMap = new Map<MediumKey, number>();
        defaultMap.set('TWEETS', 10)
        defaultMap.set('SHORT_BLOGS', 20)
        defaultMap.set('LONG_BLOGS', 20)
        defaultMap.set('BOOKS', 50)
        return defaultMap
    }

    // Percentages
    const [percentages, setPercentages] = useState(getDefaultMap)

    function renderRange() {
        if (range == 'WEEK') {
            return '1 week';
        } else if (range === 'MONTH') {
            return '1 month';
        } else if (range === 'YEAR') {
            return '1 year';
        } else if (range === '10_YEARS') {
            return '10 years';
        }
    }

    function getTotalWords(): number {
        switch (range) {
            case 'DAY':
                return wordsPerMinute * minutesPerDay
            case 'WEEK':
                return wordsPerMinute * minutesPerDay * 7
            case 'MONTH':
                return wordsPerMinute * minutesPerDay * 30
            case 'YEAR':
                return wordsPerMinute * minutesPerDay * 365
            case '10_YEARS':
                return wordsPerMinute * minutesPerDay * 365 * 10
            default:
                throw Error('No range');
        }
    }

    function rebalancePercents(updateKey: MediumKey, updateVal: number) {
        const prevValue = percentages.get(updateKey);
        const prevRemainder = 100 - prevValue;
        const remainder = 100 - updateVal;
        const newPercentages = new Map<MediumKey, number>();

        percentages.forEach((value, key) => {
            if (key === updateKey){
                newPercentages.set(key, updateVal);
            } else {
                const curPercent = percentages.get(key)
                newPercentages.set(key, remainder * curPercent / prevRemainder)
            }
        })

        setPercentages(newPercentages)
    }

    const totalWords = getTotalWords()
    const maxTweets = totalWords / TWEET_WORDS
    const maxBlogs = totalWords / SHORT_BLOG_WORDS
    const maxLongBlogs = totalWords / LONG_BLOG_WORDS
    const maxBooks = totalWords / BOOK_WORD_COUNT

    return (
        <div className="content">
            <p>
                If you read <span className="tag is-light is-link">{wordsPerMinute}</span> words per minute,
                and read <span className="tag is-light is-link">{minutesPerDay}</span> minutes per day,
                then in <span className="tag is-light is-link">{renderRange()}</span> you can read all of:
            </p>

            <ul>
                <li>
                    Tweets:&nbsp;
                    <DynamicText
                        value={percentages.get('TWEETS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxTweets).toFixed(1)}
                        onInput={(v) => rebalancePercents('TWEETS', v)}
                        onChange={(v) => {}}
                    />
                </li>

                <li>
                    Short Blog Posts:&nbsp;
                    <DynamicText
                        value={percentages.get('SHORT_BLOGS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxBlogs).toFixed(1)}
                        onInput={(v) => rebalancePercents('SHORT_BLOGS', v)}
                        onChange={(v) => {}}
                    />
                </li>

                <li>
                    Long Blog Posts:&nbsp;
                    <DynamicText
                        value={percentages.get('LONG_BLOGS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxLongBlogs).toFixed(1)}
                        onInput={(v) => rebalancePercents('LONG_BLOGS', v)}
                        onChange={(v) => {}}
                    />
                </li>

                <li>
                    Books:&nbsp;
                    <DynamicText
                        value={percentages.get('BOOKS')}
                        max={100}
                        format={(percent) => ((percent / 100.0) * maxBooks).toFixed(1)}
                        onInput={(v) => rebalancePercents('BOOKS', v)}
                        onChange={(v) => {}}
                    />
                </li>
            </ul>
        </div>
    )
}

export default Reading
