# DTI_ETI Robustness Analysis Task

## Purpose
Solve JED Reviewer 1 comments R1-P5, R1-P9 and R1-P10.

## R1-P5 Indicator explanation and sensitivity analysis

Tasks:
1. Audit DTI and ETI indicator weights under entropy-weighted TOPSIS.
2. Identify high-weight indicators.
3. Recalculate indices using alternative weighting schemes:
   - Equal weights
   - PCA weights
   - CRITIC weights
4. Compare with baseline using:
   - Pearson correlation
   - Spearman rank correlation
   - Ranking changes
5. Conduct indicator deletion tests:
   - Remove high-weight DTI indicators (technology market transaction value, tourism e-commerce sales revenue).
   - Remove high-weight ETI indicator (forest area).
6. Examine whether the coastal–mountain differentiation remains stable after deletion.

## R1-P9 Missing value treatment

Tasks:
1. Audit all missing observations by indicator, city and year.
2. Record interpolation information.
3. Generate missing-value treatment table.
4. Conduct robustness test excluding observations affected by interpolation.
5. Compare DTI, ETI and adaptation results with baseline estimates.

## R1-P10 COVID period robustness

Tasks:
1. Baseline sample: 2014-2023.
2. Robustness sample: exclude 2020-2022.
3. Re-estimate key models.
4. Compare coefficients, significance and direction with baseline results.

## Expected outputs

- indicator_sensitivity_results.xlsx
- missing_value_audit.xlsx
- covid_exclusion_robustness.xlsx
- summary_tables_for_response_letter.xlsx
