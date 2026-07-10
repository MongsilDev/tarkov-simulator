"use client";

import { useState } from "react";
import { GLOBAL, POSITIVE, NEGATIVE, conflictMap, type Trait } from "@/data/traits";
import { TraitIcon } from "@/components/TraitIcon";

const fmt = (n: number) => (n > 0 ? "+" : "") + n;

export default function Home() {
  const [sel, setSel] = useState<Set<string>>(new Set());

  const toggle = (id: string) =>
    setSel((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const cost = POSITIVE.filter((t) => sel.has(t.id)).reduce((a, t) => a + (t.points ?? 0), 0);
  const gain = NEGATIVE.filter((t) => sel.has(t.id)).reduce((a, t) => a + (t.points ?? 0), 0);
  const net = cost + gain;

  // 선택된 특성과 상호 배타 관계라 지금은 고를 수 없는 특성들
  const blocked = new Set<string>();
  for (const id of sel) {
    for (const c of conflictMap[id] ?? []) {
      if (!sel.has(c)) blocked.add(c);
    }
  }

  const Card = ({ t, type }: { t: Trait; type: "pos" | "neg" }) => {
    const isBlocked = blocked.has(t.id);
    return (
    <button
      type="button"
      className={`card ${type}`}
      aria-pressed={sel.has(t.id)}
      aria-label={`${t.name} ${fmt(t.points ?? 0)}`}
      disabled={isBlocked}
      title={isBlocked ? "충돌하는 특성이 선택되어 있어 함께 고를 수 없습니다" : undefined}
      onClick={() => toggle(t.id)}
    >
      <TraitIcon id={t.id} className="cic" />
      <div className="cbody">
        <div className="ctop">
          <span className="cname">{t.name}</span>
          <span className="cpts">{fmt(t.points ?? 0)}</span>
        </div>
        <div className="ceff">• {t.effect}</div>
      </div>
    </button>
    );
  };

  return (
    <div className="app">
      <div className="infobar" role="note">
        <span className="ico" aria-hidden="true">ⓘ</span>
        <span>
          표시된 특성의 수치와 효과는 정확하지 않을 수 있습니다. 함께 고를 수 없도록 막아둔 조합은
          공식 정보가 아니라 저희가 임의로 추정한 것이며, 지금은 그중 일부에만 적용되어 있습니다.
        </span>
      </div>
      <header>
        <div className="brand">
          <div className="mark" />
          <div>
            <div className="title">KORD BREACH</div>
            <div className="sub">특성 시뮬레이터 · SEASON 1</div>
          </div>
        </div>
        <div className="score">
          <div className="scorepanel">
            <div className="sp-break">
              <span className="c">
                긍정 <b>{cost === 0 ? "0" : fmt(cost)}</b>
              </span>
              <span className="g">
                부정 <b>{fmt(gain)}</b>
              </span>
            </div>
            <div className="sp-net">
              <div className="lab">순 합계</div>
              <div
                className="val"
                style={{ color: net < 0 ? "var(--grn)" : net > 0 ? "var(--red)" : undefined }}
              >
                {fmt(net)}
              </div>
            </div>
          </div>
          <button type="button" className="reset" onClick={() => setSel(new Set())}>
            초기화
          </button>
        </div>
      </header>

      <main>
        <div className="sec glob">
          <div className="bar gray">Global modifiers</div>
          <div className="grid glob">
            {GLOBAL.map((t) => (
              <div key={t.id} className="gchip">
                <TraitIcon id={t.id} className="cic" />
                <div className="cbody">
                  <div className="ctop">
                    <span className="cname">{t.name}</span>
                  </div>
                  <div className="ceff">• {t.effect}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="sec pos">
          <div className="bar green">Personal positive</div>
          <div className="grid pos">
            {POSITIVE.map((t) => (
              <Card key={t.id} t={t} type="pos" />
            ))}
          </div>
        </div>
        <div className="sec neg">
          <div className="bar red">Personal negative</div>
          <div className="grid neg">
            {NEGATIVE.map((t) => (
              <Card key={t.id} t={t} type="neg" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
